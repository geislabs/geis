import util from 'util'
import { ResourceAdapter } from './resourceAdapter'
import { ResourceCallback } from './resourceProvider'

export function invoke<TConf, TRes, TOut>(
    adapter: ResourceAdapter<TConf, TRes>,
    config: TConf,
    callback: (resource: TRes) => AsyncGenerator<TOut>
): AsyncGenerator<TOut>
export function invoke<TConf, TRes, TOut>(
    adapter: ResourceAdapter<TConf, TRes>,
    config: TConf,
    callback: (resource: TRes) => Generator<TOut>
): AsyncGenerator<TOut>
export function invoke<TConf, TRes, TOut>(
    adapter: ResourceAdapter<TConf, TRes>,
    config: TConf,
    callback: (resource: TRes) => Promise<TOut>
): Promise<TOut>
export function invoke<TConf, TRes, TOut>(
    adapter: ResourceAdapter<TConf, TRes>,
    config: TConf,
    callback: (resource: TRes) => TOut
): TOut
export function invoke<TConf, TRes, TOut>(
    adapter: ResourceAdapter<TConf, TRes>,
    config: TConf,
    callback: ResourceCallback<TRes, TOut>
): AsyncGenerator<TOut> | Promise<TOut> {
    if (isAsyncGenerator(callback)) {
        return (async function* () {
            const resource = await adapter.create(config)
            const source = callback(resource)
            while (true) {
                const result = await source.next()
                if (result.done) {
                    await adapter.destroy(resource)
                    return result.value
                } else {
                    yield result.value
                }
            }
        })()
    } else if (isGenerator(callback)) {
        return (async function* () {
            const resource = await adapter.create(config)
            const source = callback(resource)
            while (true) {
                const result = source.next()
                if (result.done) {
                    await adapter.destroy(resource)
                    return result.value
                } else {
                    yield result.value
                }
            }
        })()
    } else {
        return new Promise(async (resolve, reject) => {
            try {
                const resource = await adapter.create(config)
                const result = await callback(resource)
                await adapter.destroy(resource)
                resolve(result)
            } catch (error) {
                reject(error)
            }
        })
    }
}

function isAsyncGenerator<TRes, TOut>(
    callback: ResourceCallback<TRes, TOut>
): callback is (resource: TRes) => AsyncGenerator<TOut> {
    return callback.toString().includes('asyncGenerator')
}

function isGenerator<TRes, TOut>(
    callback: ResourceCallback<TRes, TOut>
): callback is (resource: TRes) => Generator<TOut> {
    return util.types.isGeneratorFunction(callback)
}
