import { ProtocolAdapter } from '../protocolTypes'
import { PromiseCallbackFn, SyncCallbackFn } from '../protocolValues'

export function runPromise<TType, TInit, TValue>(
    protocol: ProtocolAdapter<TType, TInit>,
    config: TInit,
    callback: PromiseCallbackFn<TType, TValue> | SyncCallbackFn<TType, TValue>
) {
    return new Promise(async (resolve, reject) => {
        const instance = await protocol.create(config)
        try {
            const result = await callback(instance)
            return resolve(result)
        } catch (error) {
            await protocol.destroy(instance)
            reject(error)
        }
    })
}
