import { Response } from '../src/baseResponse';
import { StatusCodes } from '../src/statusCodes';
import { getMockEvent, testUserEmail } from './testHelpers';
import * as jwt from 'jsonwebtoken';

class TestResponse extends Response {}

describe('Base Response', () => {
    it('should instantiate and log event as expected', () => {
        console.log = jest.fn();

        const mockEvent = getMockEvent();
        const actual = new TestResponse(mockEvent, StatusCodes.OK);

        expect(console.log).toHaveBeenCalledWith({
            user: testUserEmail,
            responseStatus: actual.statusCode,
            timestamp: new Date(mockEvent.requestContext.requestTimeEpoch),
            method: mockEvent.httpMethod,
            path: mockEvent.path,
            pathParameters: mockEvent.pathParameters,
            query: mockEvent.queryStringParameters,
            sourceIP: mockEvent.requestContext.identity.sourceIp,
            body: mockEvent.body
        });
    });

    it('should throw an error during instantiation - invalid token', () => {
        const mockEvent = getMockEvent({ authToken: jwt.sign({ otherProp: 'hello' }, 'secret') });

        let actual: any;
        try {
            new TestResponse(mockEvent, StatusCodes.OK);
        } catch (err) {
            actual = err;
        }

        expect(actual).toBeUndefined();
    });
});
