import { APIGatewayProxyEvent } from 'aws-lambda';
import { Response } from './BaseResponse';
import { IOptions, StatusCodes } from './utils';

export class Ok extends Response {
    constructor(event: APIGatewayProxyEvent, body?: any, options?: IOptions) {
        super(event, StatusCodes.OK, body, options);
    }
}

export class Created extends Response {
    constructor(event: APIGatewayProxyEvent, id?: any, options?: IOptions) {
        super(event, StatusCodes.CREATED, id, options);
    }
}

export class Accepted extends Response {
    constructor(event: APIGatewayProxyEvent, body?: any, options?: IOptions) {
        super(event, StatusCodes.ACCEPTED, body, options);
    }
}

export class NoContent extends Response {
    constructor(event: APIGatewayProxyEvent, options?: IOptions) {
        super(event, StatusCodes.NO_CONTENT, undefined, options);
    }
}
