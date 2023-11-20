import { StatusCodeType } from './utils';

export class CustomException {
    statusCode: StatusCodeType;
    message: string;
    name = 'CustomException';

    constructor(statusCode: StatusCodeType, message: string) {
        this.statusCode = statusCode;
        this.message = message;
    }
}
