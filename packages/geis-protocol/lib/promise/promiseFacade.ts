import { ProtocolResponse, Subprotocol } from '../protocolTypes'
import { PromiseCallbackFn, SyncCallbackFn } from '../protocolValues'

export function runPromise<
    TType extends ProtocolResponse,
    TInit,
    TValue,
    TContext
>(
    protocol: Subprotocol<string, TInit, any, any, TType>,
    url: string,
    config: TInit[],
    callback:
        | PromiseCallbackFn<TType, TValue, TContext>
        | SyncCallbackFn<TType, TValue, TContext>
) {
    return new Promise(async (resolve, reject) => {
        const context = await protocol.init()
        const request = await protocol.parse(url, config)
        const source = protocol.eval(request, context)
        let index = 0
        for await (const instance of source) {
            try {
                const result = await callback(instance, index, context)
                return resolve(result)
            } catch (error) {
                await protocol.dispose(instance)
                reject(error)
            }
            index++
        }
    })
}
