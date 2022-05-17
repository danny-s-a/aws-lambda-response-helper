import { StatusCodes, StatusCodeType } from './statusCodes';
import { IObject, Response } from './baseResponse';
import { APIGatewayProxyEvent } from 'aws-lambda';

export class ErrorResponse extends Response {
    constructor(exception: CustomException, event: APIGatewayProxyEvent, headers?: IObject) {
        super(event, exception.statusCode, exception.message, headers);
    }
}

export function errorHandler(err: any, event: APIGatewayProxyEvent, headers?: IObject): Response {
    if (err.name !== 'CustomException') {
        console.log(err);
        err = new InternalServerError();
    }

    return new ErrorResponse(err, event, headers);
}

export class CustomException extends Error {
    statusCode: StatusCodeType;
    message: string;
    name = 'CustomException';

    constructor(statusCode: StatusCodeType, message: string) {
        super();

        this.statusCode = statusCode;
        this.message = message;
    }
}

// 5XX Responses
export class InternalServerError extends CustomException {
    constructor() {
        super(StatusCodes.INTERNAL_ERROR, 'Internal Server Error');
    }
}

export class NotImplemented extends CustomException {
    constructor(msg?: any) {
        super(StatusCodes.NOT_IMPLEMENTED, msg);
    }
}
