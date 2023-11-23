import { APIGatewayProxyEvent } from 'aws-lambda';
import * as jwt from 'jsonwebtoken';
import { IOptions, IOptionsDefined, Options, StatusCodeType } from './utils';


export interface IResponse {
    statusCode: number;
    body: any;
    headers: {[key: string]: any;};
}

export abstract class Response implements IResponse {
    readonly statusCode: number;
    readonly body: any;
    readonly headers: {[key: string]: any};
    private readonly options: IOptionsDefined;

    constructor(event: APIGatewayProxyEvent, statusCode: StatusCodeType, body?: any, options?: IOptions) {
        this.statusCode = statusCode;
        this.body = JSON.stringify(body);
        this.options = new Options(options);
        this.headers = this.options.headers;

        this.logRequest(event);
    }

    private logRequest(event: APIGatewayProxyEvent) {
        const token = event.headers[this.options.tokenHeaderKey];

        this.options.logger.log(
            JSON.stringify({
                user: token ? this.getUser(token) : undefined,
                responseStatus: this.statusCode,
                timestamp: new Date(event.requestContext.requestTimeEpoch),
                method: event.httpMethod,
                path: event.path,
                pathParameters: event.pathParameters,
                query: event.queryStringParameters,
                sourceIP: event.requestContext.identity.sourceIp,
                body: this.options.hideBody ? '********' : event.body
            })
        );
    }

    private getUser(token: string): string {
        const decodedToken = jwt.decode(token);
        const user = (decodedToken as jwt.JwtPayload)[this.options.tokenUserKey];

        if (user) {
            return user;
        } else {
            throw new Error(`JWT invalid. Does not contain property ${this.options.tokenUserKey}`);
        }
    }
}
