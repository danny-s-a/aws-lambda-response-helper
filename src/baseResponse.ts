import { APIGatewayProxyEvent } from 'aws-lambda';
import * as jwt from 'jsonwebtoken';
import { StatusCodeType } from './statusCodes';

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
        headers?: IObject,
        tokenUserKey = 'email') {
        this.statusCode = statusCode;
        this.body = JSON.stringify(body);
        if (headers) {
            this.headers = headers;
        }

        this.logRequest(event, tokenUserKey);
    }

    private logRequest(event: APIGatewayProxyEvent, tokenUserKey: string) {
        let user;
        if (event.headers.Authorization) {
            user = this.getUser(event.headers.Authorization, tokenUserKey);
        }

        console.log({
            user,
            responseStatus: this.statusCode,
            timestamp: new Date(event.requestContext.requestTimeEpoch),
            method: event.httpMethod,
            path: event.path,
            pathParameters: event.pathParameters,
            query: event.queryStringParameters,
            sourceIP: event.requestContext.identity.sourceIp,
            body: event.body
        });
    }

    private getUser(token: string, tokenUserKey: string) {
        try {
            const decodedToken = jwt.decode(token);

            const user = (decodedToken as jwt.JwtPayload)[tokenUserKey];

            if (user) {
                return user;
            } else {
                throw new Error(`JWT invalid. Does not contain property ${tokenUserKey}`);
            }
        } catch (err) {
            console.log(err);
        }
    }
}
