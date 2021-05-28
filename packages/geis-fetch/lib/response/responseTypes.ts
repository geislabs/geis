import { FetchRequest } from '../request'

export interface FetchResponse<T = unknown> {
    data: T
    request: FetchRequest<T>
}
