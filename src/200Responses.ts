import { APIGatewayProxyEvent } from 'aws-lambda';
import { IObject, Response } from './BaseResponse';
import { StatusCodes } from './utils';

export class Ok extends Response {
    constructor(event: APIGatewayProxyEvent, body?: any, headers?: IObject, hideBody?: boolean) {
        super(event, StatusCodes.OK, body, headers, hideBody);
    }
}

export class Created extends Response {
    constructor(event: APIGatewayProxyEvent, id?: any, headers?: IObject, hideBody?: boolean) {
        super(event, StatusCodes.CREATED, id, headers, hideBody);
    }
}

export class Accepted extends Response {
    constructor(event: APIGatewayProxyEvent, body?: any, headers?: IObject, hideBody?: boolean) {
        super(event, StatusCodes.ACCEPTED, body, headers, hideBody);
    }
}

export class NoContent extends Response {
    constructor(event: APIGatewayProxyEvent, headers?: IObject, hideBody?: boolean) {
        super(event, StatusCodes.NO_CONTENT, undefined, headers, hideBody);
    }
}
