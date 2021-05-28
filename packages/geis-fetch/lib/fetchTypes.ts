import { JsonPath } from '@geislabs/geis-json'
import { Protocol, ProtocolFn, Subprotocol } from '@geislabs/geis-protocol'
import { AnyConfig, body, header } from './config'
import { FetchConfig } from './fetchConfig'
import { FetchRequest } from './request'
import { FetchResponse } from './response'

export interface ProtocolResponse<TValue> {
    parse: (selector: string) => TValue
}

export interface FetchSubProtocol<
    TName extends string = string,
    TInit = AnyConfig,
    TSource = any,
    TValue = any
> extends Subprotocol<
        TName,
        TInit,
        TSource,
        FetchRequest<TValue>,
        FetchResponse<TValue>
    > {}

export interface FetchProtocolFn
    extends ProtocolFn<
        Protocol<
            | FetchSubProtocol<'json', AnyConfig, object, JsonPath>
            | FetchSubProtocol<'html', AnyConfig, string, string>
        >
    > {
    header: typeof header
    body: typeof body
}
