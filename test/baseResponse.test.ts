import { Response } from '../src/BaseResponse';
import { StatusCodes } from '../src/statusCodes';
import { getMockEvent, testUserEmail } from './testHelpers';
import * as jwt from 'jsonwebtoken';

class TestResponse extends Response {}

describe('Base Response', () => {
    it('should instantiate and log event as expected', () => {
        console.log = jest.fn();

        const mockEvent = getMockEvent();
        const testStatusCode = StatusCodes.OK;
        const testHeaders = { testHeaderKey: 'iHaveBeenSet' };
        const actual = new TestResponse(mockEvent, testStatusCode, undefined, { testHeaderKey: 'iHaveBeenSet' });

        expect(actual.statusCode).toEqual(testStatusCode);
        expect(actual.body).toBeUndefined();
        expect(actual.headers).toEqual(testHeaders);

        expect(console.log).toHaveBeenCalledWith(
            JSON.stringify({
                user: testUserEmail,
                responseStatus: actual.statusCode,
                timestamp: new Date(mockEvent.requestContext.requestTimeEpoch),
                method: mockEvent.httpMethod,
                path: mockEvent.path,
                pathParameters: mockEvent.pathParameters,
                query: mockEvent.queryStringParameters,
                sourceIP: mockEvent.requestContext.identity.sourceIp,
                body: mockEvent.body
            })
        );
    });

    it('should throw an error during instantiation - invalid token', () => {
        const mockEvent = getMockEvent({ authToken: jwt.sign({ otherProp: 'hello' }, 'secret') });

        let actual: any;
        try {
            new TestResponse(mockEvent, StatusCodes.OK);
        } catch (err) {
            actual = err;
        }

        expect(actual).toEqual(new Error('JWT invalid. Does not contain property email'));
    });

    it('should instantiate and log event as expected - using env vars for token keys and body should be hidden', () => {
        console.log = jest.fn();

        const tokenHeaderKey = 'x-auth-token';
        process.env.ALR_TOKEN_HEADER_KEY = tokenHeaderKey;
        const userTokenKey = 'username';
        process.env.ALR_TOKEN_USER_KEY = userTokenKey;

        const mockEvent = getMockEvent({
            headers: {
                [tokenHeaderKey]: jwt.sign({ [userTokenKey]: testUserEmail, email: 'shouldnot@test.com' }, 'secret')
            },
            body: JSON.stringify({
                key: 'sensitive value'
            })
        });
        const testStatusCode = StatusCodes.OK;
        const actual = new TestResponse(mockEvent, testStatusCode, undefined, undefined, true);

        expect(actual.statusCode).toEqual(testStatusCode);
        expect(actual.body).toBeUndefined();

        expect(console.log).toHaveBeenCalledWith(
            JSON.stringify({
                user: testUserEmail,
                responseStatus: actual.statusCode,
                timestamp: new Date(mockEvent.requestContext.requestTimeEpoch),
                method: mockEvent.httpMethod,
                path: mockEvent.path,
                pathParameters: mockEvent.pathParameters,
                query: mockEvent.queryStringParameters,
                sourceIP: mockEvent.requestContext.identity.sourceIp,
                body: '********'
            })
        );

        process.env.ALR_TOKEN_HEADER_KEY = undefined;
        process.env.ALR_TOKEN_USER_KEY = undefined;
    });
});
