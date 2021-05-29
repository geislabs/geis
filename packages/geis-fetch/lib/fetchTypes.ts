import { JsonPath } from '@geislabs/geis-json'
import {
    Protocol,
    ProtocolFn,
    ProtocolResponse,
    Subprotocol,
} from '@geislabs/geis-protocol'
import { AnyConfig, body, header } from './config'
import { FetchRequest } from './request'
import { FetchResponse } from './response'

export interface FetchSubProtocol<
    TName extends string = string,
    TInit = AnyConfig,
    TSource = any,
    TValue extends ProtocolResponse = ProtocolResponse
> extends Subprotocol<
        TName,
        TInit,
        TSource,
        FetchRequest<TValue>,
        FetchResponse<TValue>
    > {}

export interface FetchProtocolFn
    extends ProtocolFn<
        Protocol<FetchSubProtocol<'json', AnyConfig, object, JsonPath>>
        // | FetchSubProtocol<'html', AnyConfig, string, string>
    > {
    header: typeof header
    body: typeof body
}
