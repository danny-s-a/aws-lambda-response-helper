import { APIGatewayProxyEvent } from 'aws-lambda';
import * as jwt from 'jsonwebtoken';

/* eslint-disable no-unused-vars */
export enum HTTPMethod {
    DELETE = 'DELETE',
    GET = 'GET',
    PATCH = 'PATCH',
    POST = 'POST',
    PUT = 'PUT'
}
/* eslint-enable no-unused-vars */

export const testUserEmail = 'bob@test.com';

export interface IMockEventParams {
    method?: HTTPMethod;
    body?: any,
    headers?: {[key: string]: string},
    pathParameters?: {[key: string]: string},
    queryStringParameters?: {[key: string]: string},
    multiValueQueryStringParameters?: {[key: string]: string[]},
    authToken?: string;
    requestTimeEpoch?: number;
}

export const getToken = (user = testUserEmail, tokenUserKey = 'email') => jwt.sign({ [tokenUserKey]: user }, 'secret');

export function getMockEvent(params: IMockEventParams = {
    method: HTTPMethod.GET,
    authToken: getToken(),
    requestTimeEpoch: new Date().getTime()
}): APIGatewayProxyEvent {
    return {
        body: JSON.stringify(params.body),
        headers: params.headers || { Authorization: params.authToken },
        httpMethod: params.method,
        path: '/',
        pathParameters: params.pathParameters,
        queryStringParameters: params.queryStringParameters,
        isBase64Encoded: false,
        multiValueQueryStringParameters: params.multiValueQueryStringParameters,
        stageVariables: {},
        requestContext: {
            identity: {
                sourceIp: '127.0.0.1'
            },
            requestTimeEpoch: params.requestTimeEpoch
        },
        resource: undefined
    } as unknown as APIGatewayProxyEvent;
}
