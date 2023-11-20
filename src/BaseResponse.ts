import { APIGatewayProxyEvent } from 'aws-lambda';
import * as jwt from 'jsonwebtoken';
import { IOptions, StatusCodeType } from './utils';

export interface IObject {
    [key: string]: any;
}

export interface IResponse {
    statusCode: number;
    body: any;
    headers: IObject
}

export abstract class Response implements IResponse {
    readonly statusCode: number;
    readonly body: any;
    readonly headers: IObject = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    };

    constructor(
        event: APIGatewayProxyEvent,
        statusCode: StatusCodeType,
        body?: any,
        options: IOptions = {
            hideBody: false,
            logger: console,
            tokenHeaderKey: 'Authorization'
        }) {
        this.statusCode = statusCode;
        this.body = JSON.stringify(body);
        if (options.headers) {
            this.headers = options.headers;
        }

        this.logRequest(event, options);
    }

    private logRequest(event: APIGatewayProxyEvent, options: IOptions) {
        let user;

        if (event.headers[options.tokenHeaderKey!]) {
            user = this.getUser(event.headers[options.tokenHeaderKey!]!);
        }

        options.logger.log(
            JSON.stringify({
                user,
                responseStatus: this.statusCode,
                timestamp: new Date(event.requestContext.requestTimeEpoch),
                method: event.httpMethod,
                path: event.path,
                pathParameters: event.pathParameters,
                query: event.queryStringParameters,
                sourceIP: event.requestContext.identity.sourceIp,
                body: options.hideBody ? '********' : event.body
            })
        );
    }

    private getUser(token: string) {
        const tokenUserKey = process.env.ALR_TOKEN_USER_KEY ?? 'email';
        const decodedToken = jwt.decode(token);

        const user = (decodedToken as jwt.JwtPayload)[tokenUserKey];

        if (user) {
            return user;
        } else {
            throw new Error(`JWT invalid. Does not contain property ${tokenUserKey}`);
        }
    }
}
