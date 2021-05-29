import { ProtocolResponse } from '../fetchTypes'
import { FetchRequest } from '../request'

export interface FetchResponse<T> extends ProtocolResponse<T> {
    data: T
    request: FetchRequest<T>
}
