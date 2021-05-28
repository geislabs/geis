import { PromiseCallbackFn, run } from '@geislabs/geis-protocol'
import { AnyConfig, header, body } from './config'
import { FetchConfig, SerdesMap } from './fetchConfig'
import { FetchAdapter } from './fetchFacade'
import { FetchProtocol } from './fetchTypes'
import { getCallback, getConfig, getConfigs, getSerdes } from './fetchUtils'
import { nodeFetch } from './node/nodeFacade'
import { buildRequest } from './request/requestFactory'
import { FetchRequest } from './request/requestTypes'
import { FetchResponse } from './response/responseTypes'

function internal<TValue>(
    url: string,
    config?: Partial<FetchConfig>
): Promise<FetchResponse>
function internal<TValue>(
    url: string,
    actions?: AnyConfig[],
    config?: Partial<FetchConfig>
): Promise<FetchResponse>
function internal<TValue>(
    url: string,
    actions: AnyConfig[],
    callback?: PromiseCallbackFn<FetchResponse, TValue>,
    config?: Partial<FetchConfig>
): Promise<FetchResponse>
function internal<TValue>(
    url: string,
    callback: PromiseCallbackFn<FetchResponse, TValue>,
    config?: Partial<FetchConfig>
): Promise<TValue>
function internal<TValue>(
    url: string,
    arg1?:
        | PromiseCallbackFn<FetchResponse, TValue>
        | Partial<FetchConfig>
        | AnyConfig[],
    arg2?: Partial<FetchConfig> | PromiseCallbackFn<FetchResponse, TValue>,
    arg3?: Partial<FetchConfig>
) {
    const configs = getConfigs(arg1)
    const callback = getCallback(arg1, arg2)
    const {
        adapter: fetch = nodeFetch,
        serdes = {
            json: {
                encode: (value) => JSON.stringify(value),
                decode: (value) => JSON.parse(value),
            },
            html: {
                encode: (value) => value.data,
                decode: (value) => ({ data: value }),
            },
        } as SerdesMap,
        ...config
    } = getConfig(arg1, arg2, arg3)

    const parser = getSerdes(
        // @ts-expect-error
        url,
        serdes
    )
    const protocol = new FetchAdapter({
        adapter: fetch,
        serdes,
        ...config,
    })
    const attrs: FetchRequest = buildRequest<any>(parser, configs, { url })

    if (callback) {
        return run(protocol, attrs, callback)
    } else {
        return protocol.create(attrs)
    }
}

// @ts-expect-error
export const fetch: FetchProtocol = Object.assign(internal, {
    header,
    body,
})
