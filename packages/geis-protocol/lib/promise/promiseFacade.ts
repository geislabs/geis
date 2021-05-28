import { ProtocolResponse, Subprotocol } from '../protocolTypes'
import { PromiseCallbackFn, SyncCallbackFn } from '../protocolValues'

export function runPromise<TType extends ProtocolResponse, TInit, TValue>(
    protocol: Subprotocol<string, TInit, any, any, TType>,
    url: string,
    config: TInit[],
    callback: PromiseCallbackFn<TType, TValue> | SyncCallbackFn<TType, TValue>
) {
    return new Promise(async (resolve, reject) => {
        const request = await protocol.parse(url, config)
        const source = protocol.eval(request)
        for await (const instance of source) {
            try {
                const result = await callback(instance)
                return resolve(result)
            } catch (error) {
                await protocol.dispose(instance)
                reject(error)
            }
        }
    })
}
