import { CustomException } from './exceptions';
import { StatusCodes } from './statusCodes';

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
