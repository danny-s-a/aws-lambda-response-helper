import { BadRequest, Conflict, Forbidden, NotFound, PaymentRequired, Unauthorised } from '../src/400Responses';
import { StatusCodes } from '../src/statusCodes';


describe('400 Responses', () => {
    it('should return a BadRequest exception - no message', () => {
        const actual = new BadRequest();

        expect(actual.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(actual.message).toBeUndefined();
    });

    it('should return a BadRequest exception - with message', () => {
        const testMessage = 'Client made a bad request';
        const actual = new BadRequest(testMessage);

        expect(actual.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(actual.message).toEqual(testMessage);
    });

    it('should return a Unauthorised exception - no message', () => {
        const actual = new Unauthorised();

        expect(actual.statusCode).toEqual(StatusCodes.UNAUTHORISED);
        expect(actual.message).toBeUndefined();
    });

    it('should return a Unauthorised exception - with message', () => {
        const testMessage = 'Client not authorised to make request';
        const actual = new Unauthorised(testMessage);

        expect(actual.statusCode).toEqual(StatusCodes.UNAUTHORISED);
        expect(actual.message).toEqual(testMessage);
    });

    it('should return a PaymentRequired exception - no message', () => {
        const actual = new PaymentRequired();

        expect(actual.statusCode).toEqual(StatusCodes.PAYMENT_REQUIRED);
        expect(actual.message).toBeUndefined();
    });

    it('should return a PaymentRequired exception - with message', () => {
        const testMessage = 'Payment required before client can make request';
        const actual = new PaymentRequired(testMessage);

        expect(actual.statusCode).toEqual(StatusCodes.PAYMENT_REQUIRED);
        expect(actual.message).toEqual(testMessage);
    });

    it('should return a Forbidden exception - no message', () => {
        const actual = new Forbidden();

        expect(actual.statusCode).toEqual(StatusCodes.FORBIDDEN);
        expect(actual.message).toBeUndefined();
    });

    it('should return a Forbidden exception - with message', () => {
        const testMessage = 'Client was forbidden from making request';
        const actual = new Forbidden(testMessage);

        expect(actual.statusCode).toEqual(StatusCodes.FORBIDDEN);
        expect(actual.message).toEqual(testMessage);
    });

    it('should return a NotFound exception - no message', () => {
        const actual = new NotFound();

        expect(actual.statusCode).toEqual(StatusCodes.NOT_FOUND);
        expect(actual.message).toBeUndefined();
    });

    it('should return a NotFound exception - with message', () => {
        const testMessage = 'Thing not found';
        const actual = new NotFound(testMessage);

        expect(actual.statusCode).toEqual(StatusCodes.NOT_FOUND);
        expect(actual.message).toEqual(testMessage);
    });

    it('should return a Conflict exception - no message', () => {
        const actual = new Conflict();

        expect(actual.statusCode).toEqual(StatusCodes.CONFLICT);
        expect(actual.message).toBeUndefined();
    });

    it('should return a Conflict exception - with message', () => {
        const testMessage = 'Client did something that caused a conflict';
        const actual = new Conflict(testMessage);

        expect(actual.statusCode).toEqual(StatusCodes.CONFLICT);
        expect(actual.message).toEqual(testMessage);
    });
});
