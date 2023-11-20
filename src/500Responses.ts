import { StatusCodes } from './utils';
import { CustomException } from './CustomException';

export class InternalServerError extends CustomException {
    constructor(msg: any = 'Internal Server Error') {
        super(StatusCodes.INTERNAL_ERROR, msg);
    }
}

export class NotImplemented extends CustomException {
    constructor(msg?: any) {
        super(StatusCodes.NOT_IMPLEMENTED, msg);
    }
}
