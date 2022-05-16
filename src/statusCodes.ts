export type StatusCodeType = StatusCodes | number;

export enum StatusCodes {
    /* eslint-disable no-unused-vars */
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,

    BAD_REQUEST = 400,
    UNAUTHORISED = 401,
    PAYMENT_REQUIRED = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,

    INTERNAL_ERROR = 500,
    NOT_IMPLEMENTED = 501
    /* eslint-enable no-unused-vars */
}
