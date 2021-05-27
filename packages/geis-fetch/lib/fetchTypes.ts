import { Protocol } from '@geislabs/geis-protocol'
import { FetchResponse } from './response'
import { AnyConfig, body, header } from './config'
import { FetchConfig } from './fetchConfig'

export interface FetchSubprotocol {
    html: FetchResponse<string>
    json: FetchResponse<object>
}

export interface FetchProtocol
    extends Protocol<FetchSubprotocol, AnyConfig, FetchConfig> {
    header: typeof header
    body: typeof body
}
