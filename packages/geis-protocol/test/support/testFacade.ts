import { createProtocol, Subprotocol, Protocol } from '../../lib'
import { FetchConfig } from './testTypes'

export interface TestRequest {
    headers: object
}

export interface TestResponse<T> {
    data: T
    request: TestRequest
}

export interface TestTextProtocol
    extends Subprotocol<
        'text',
        FetchConfig,
        string,
        TestRequest,
        TestResponse<string>
    > {}

export interface TestJsonProtocol
    extends Subprotocol<
        'json',
        FetchConfig,
        object,
        TestRequest,
        TestResponse<object>
    > {}

export type TestProtocol = Protocol<TestTextProtocol | TestJsonProtocol>

export const createFetch = (
    response: string,
    overrides: Partial<Omit<Subprotocol, 'name'>> = {}
) =>
    createProtocol<TestProtocol>({
        text: {
            name: 'text',
            parse: async (_url, init) => ({
                headers: init.reduce(
                    (acc, config) => ({ ...acc, [config.name]: config.value }),
                    {}
                ),
            }),
            eval: async function* (request) {
                yield { data: response, request }
            },
            dispose: async () => undefined,
            ...overrides,
        },
        json: {
            name: 'json',
            parse: async (_url, init) => ({
                headers: init.reduce(
                    (acc, config) => ({ ...acc, [config.name]: config.value }),
                    {}
                ),
            }),
            eval: async function* (request) {
                yield { data: JSON.parse(response), request }
            },
            dispose: async () => undefined,
            ...overrides,
        },
    })
