import { APIGatewayProxyEvent } from 'aws-lambda';
import { InternalServerError } from './500Responses';
import { IObject, Response } from './BaseResponse';
import { CustomException } from './CustomException';


export class ErrorResponse extends Response {
    constructor(exception: CustomException, event: APIGatewayProxyEvent, headers?: IObject) {
        super(event, exception.statusCode, exception.message, headers);
    }
}

export function errorHandler(
    err: any,
    event: APIGatewayProxyEvent,
    headers?: IObject): Response {
    if (err.name !== 'CustomException') {
        console.log(err);
        err = new InternalServerError();
    }

    return new ErrorResponse(err as CustomException, event, headers);
}
