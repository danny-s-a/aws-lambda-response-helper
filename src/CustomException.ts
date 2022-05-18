import { StatusCodeType } from './statusCodes';

export default class CustomException {
    statusCode: StatusCodeType;
    message: string;
    name = 'CustomException';

    constructor(statusCode: StatusCodeType, message: string) {
        this.statusCode = statusCode;
        this.message = message;
    }
}
