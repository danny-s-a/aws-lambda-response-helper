import { APIGatewayProxyEvent } from 'aws-lambda';
import jwtDecode from 'jwt-decode';
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

    constructor(event: APIGatewayProxyEvent, statusCode: StatusCodeType, body?: any, headers?: IObject) {
        this.statusCode = statusCode;
        this.body = JSON.stringify(body);
        if (headers) {
            this.headers = headers;
        }

        this.logRequest(event);
    }

    private logRequest(event: APIGatewayProxyEvent) {
        let user;
        if (event.headers.Authorization) {
            user = this.getUser(event.headers.Authorization);
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

    private getUser(token: string) {
        try {
            const decodedToken = jwtDecode<IObject>(token);

            if (decodedToken) {
                return decodedToken.email;
            }
        } catch (err) {
            console.log(err);
        }
    }
}
