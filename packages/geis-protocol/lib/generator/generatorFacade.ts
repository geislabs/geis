import { ProtocolResponse, Subprotocol } from '../protocolTypes'
import { AnyGeneratorCallbackFn } from '../protocolValues'

export function runGenerator<TType extends ProtocolResponse, TInit, TValue>(
    protocol: Subprotocol<string, TInit, any, any, TType>,
    url: string,
    config: TInit[],
    callback: AnyGeneratorCallbackFn<TType, TValue>
): AsyncGenerator<TValue> {
    return (async function* () {
        const request = await protocol.parse(url, config)
        const source = protocol.eval(request)
        for await (const instance of source) {
            try {
                yield* callback(instance)
            } catch (error) {
                await protocol.dispose(instance)
                return Promise.reject(error)
            }
        }
    })()
}
