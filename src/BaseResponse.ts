import { APIGatewayProxyEvent } from 'aws-lambda';
import * as jwt from 'jsonwebtoken';
import { IOptions, Options, StatusCodeType } from './utils';


export interface IResponse {
    statusCode: number;
    body: any;
    headers: {[key: string]: any;};
}

export abstract class Response implements IResponse {
    readonly statusCode: number;
    readonly body: any;
    readonly headers: {[key: string]: any};

    constructor(event: APIGatewayProxyEvent, statusCode: StatusCodeType, body?: any, providedOptions?: IOptions) {
        this.statusCode = statusCode;
        this.body = JSON.stringify(body);
        const options = new Options(providedOptions);
        this.headers = options.headers;

        this.logRequest(event, options);
    }

    private logRequest(event: APIGatewayProxyEvent, options: Options) {
        const token = event.headers[options.tokenHeaderKey];

        options.logger.log(
            JSON.stringify({
                user: token ? this.getUser(token, options) : undefined,
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

    private getUser(token: string, options: Options): string {
        const decodedToken = jwt.decode(token);
        const user = (decodedToken as jwt.JwtPayload)[options.tokenUserKey];

        if (user) {
            return user;
        } else {
            throw new Error(`JWT invalid. Does not contain property ${options.tokenUserKey}`);
        }
    }
}
