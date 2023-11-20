import { CustomException } from './CustomException';
import { StatusCodes } from './utils';

// 4XX Responses
export class BadRequest extends CustomException {
    constructor(msg?: any) {
        super(StatusCodes.BAD_REQUEST, msg);
    }
}

export class Unauthorised extends CustomException {
    constructor(msg?: any) {
        super(StatusCodes.UNAUTHORISED, msg);
    }
}

export class PaymentRequired extends CustomException {
    constructor(msg?: any) {
        super(StatusCodes.PAYMENT_REQUIRED, msg);
    }
}

export class Forbidden extends CustomException {
    constructor(msg?: any) {
        super(StatusCodes.FORBIDDEN, msg);
    }
}

export class NotFound extends CustomException {
    constructor(msg?: any) {
        super(StatusCodes.NOT_FOUND, msg);
    }
}

export class Conflict extends CustomException {
    constructor(msg?: any) {
        super(StatusCodes.CONFLICT, msg);
    }
}
