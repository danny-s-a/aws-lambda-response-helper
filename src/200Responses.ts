import { APIGatewayProxyEvent } from 'aws-lambda';
import { IObject, Response } from './baseResponse';
import { StatusCodes } from './statusCodes';

export class Ok extends Response {
    constructor(event: APIGatewayProxyEvent, body?: any, headers?: IObject) {
        super(event, StatusCodes.OK, body, headers);
    }
}

export class Created extends Response {
    constructor(event: APIGatewayProxyEvent, id?: any, headers?: IObject) {
        super(event, StatusCodes.CREATED, id, headers);
    }
}

export class Accepted extends Response {
    constructor(event: APIGatewayProxyEvent, body?: any, headers?: IObject) {
        super(event, StatusCodes.ACCEPTED, body, headers);
    }
}

export class NoContent extends Response {
    constructor(event: APIGatewayProxyEvent, headers?: IObject) {
        super(event, StatusCodes.NO_CONTENT, undefined, headers);
    }
}
