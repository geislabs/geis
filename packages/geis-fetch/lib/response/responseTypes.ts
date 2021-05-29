import { ProtocolResponse } from '@geislabs/geis-protocol'
import { FetchRequest } from '../request'

export interface FetchResponse<T extends ProtocolResponse>
    extends ProtocolResponse<T> {
    data: T
    request: FetchRequest<T>
}
