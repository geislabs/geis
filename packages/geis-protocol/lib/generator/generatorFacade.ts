import { ProtocolAdapter } from '../protocolAdapter'
import { AnyGeneratorCallbackFn } from '../protocolValues'

export function runGenerator<TType, TInit, TValue>(
    protocol: ProtocolAdapter<TType, TInit>,
    config: TInit,
    callback: AnyGeneratorCallbackFn<TType, TValue>
): AsyncGenerator<TValue> {
    return (async function* () {
        const instance = await protocol.create(config)
        try {
            yield* callback(instance)
        } catch (error) {
            await protocol.destroy(instance)
            Promise.reject(error)
        }
    })()
}
