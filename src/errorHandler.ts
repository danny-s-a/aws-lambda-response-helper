import { APIGatewayProxyEvent } from 'aws-lambda';
import { InternalServerError } from './500Responses';
import { Response } from './BaseResponse';
import { CustomException } from './CustomException';
import { IOptions } from './utils';


export class ErrorResponse extends Response {
    constructor(exception: CustomException, event: APIGatewayProxyEvent, options: IOptions) {
        super(event, exception.statusCode, exception.message, options);
    }
}

export function errorHandler(
    err: any,
    event: APIGatewayProxyEvent,
    options: IOptions = {
        hideBody: false,
        logger: console
    }
): Response {
    options.logger.error(err);

    if (err.name !== 'CustomException') {
        err = new InternalServerError();
    }

    return new ErrorResponse(err as CustomException, event, options);
}
