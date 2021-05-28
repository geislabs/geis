import { PromiseCallbackFn, ProtocolMap } from '@geislabs/geis-protocol'
import { AnyConfig } from './config'
import { FetchConfig } from './fetchConfig'
import { FetchProtocolMap } from './fetchTypes'
import { FetchResponse } from './response/responseTypes'

export function getConfigs<TValue>(
    arg1?:
        | PromiseCallbackFn<FetchResponse, TValue>
        | Partial<FetchConfig>
        | AnyConfig[]
) {
    if (Array.isArray(arg1)) {
        return arg1
    }
    return []
}

export function getCallback<TValue>(
    arg1?:
        | PromiseCallbackFn<FetchResponse, TValue>
        | Partial<FetchConfig>
        | AnyConfig[],
    arg2?: Partial<FetchConfig> | PromiseCallbackFn<FetchResponse, TValue>
) {
    if (typeof arg2 === 'function') {
        return arg2
    }
    if (typeof arg1 === 'function') {
        return arg1
    }
    return null
}

export function getConfig<TValue>(
    arg1?:
        | PromiseCallbackFn<FetchResponse, TValue>
        | Partial<FetchConfig>
        | AnyConfig[],
    arg2?: Partial<FetchConfig> | PromiseCallbackFn<FetchResponse, TValue>,
    arg3?: Partial<FetchConfig>
): Partial<FetchConfig> {
    if (typeof arg3 === 'object' && !Array.isArray(arg3)) {
        return arg3
    }
    if (typeof arg2 === 'object' && !Array.isArray(arg2)) {
        return arg2
    }
    if (typeof arg1 === 'object' && !Array.isArray(arg1)) {
        return arg1
    }
    return {}
}

export function getProtocol<TProto extends FetchProtocolMap>(
    url: `${keyof TProto & string}://${string}`,
    protocols: TProto
) {
    const [protocol] = url.split('://')
    const found = protocols?.[protocol]
    if (!found) {
        throw new Error(`protocol ${protocol} not foind`)
    }
    return found
}
