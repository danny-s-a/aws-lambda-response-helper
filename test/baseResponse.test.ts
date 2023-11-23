import { Response } from '../src/BaseResponse';
import { StatusCodes } from '../src/utils';
import { getMockEvent, getToken, testUserEmail } from './testHelpers';
import * as jwt from 'jsonwebtoken';

class TestResponse extends Response {}

describe('BaseResponse', () => {
    it('should instantiate and log event as expected', () => {
        console.log = jest.fn();

        const testStatusCode = StatusCodes.OK;
        const testHeaders = { testHeaderKey: 'iHaveBeenSet' };
        const mockEvent = getMockEvent({ headers: { [testHeaders.testHeaderKey]: getToken() } });
        const actual = new TestResponse(
            mockEvent,
            testStatusCode,
            undefined,
            {
                tokenHeaderKey: 'iHaveBeenSet',
                logger: console,
                headers: testHeaders
            }
        );

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

    it('should instantiate and log event as expected - no user', () => {
        console.log = jest.fn();

        const testStatusCode = StatusCodes.OK;
        const testHeaders = { testHeaderKey: 'iHaveBeenSet' };
        const mockEvent = getMockEvent({ headers: testHeaders });
        const actual = new TestResponse(
            mockEvent,
            testStatusCode,
            undefined,
            {
                tokenHeaderKey: 'iHaveBeenSet',
                logger: console,
                headers: testHeaders
            }
        );

        expect(actual.statusCode).toEqual(testStatusCode);
        expect(actual.body).toBeUndefined();
        expect(actual.headers).toEqual(testHeaders);
        expect(console.log).toHaveBeenCalledWith(
            JSON.stringify({
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
        const userTokenKey = 'username';

        const mockEvent = getMockEvent({
            headers: {
                [tokenHeaderKey]: jwt.sign({ [userTokenKey]: testUserEmail, email: 'shouldnot@test.com' }, 'secret')
            },
            body: JSON.stringify({
                key: 'sensitive value'
            })
        });
        const testStatusCode = StatusCodes.OK;
        const actual = new TestResponse(
            mockEvent,
            testStatusCode,
            undefined,
            {
                hideBody: true,
                tokenHeaderKey: tokenHeaderKey,
                tokenUserKey: userTokenKey
            }
        );

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
    });
});
