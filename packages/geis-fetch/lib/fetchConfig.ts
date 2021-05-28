import { FetchSubprotocol } from './fetchTypes'
import { FetchRequest } from './request'
import { Serdes } from './serdes'

export type FetchFn<T> = (
    request: FetchRequest<T>
) => Promise<{ body: string | NodeJS.ReadableStream }>

export type SerdesMap = {
    [P in keyof FetchSubprotocol]: Serdes<FetchSubprotocol[P]>
}

export interface FetchConfig<T = any> {
    adapter: FetchFn<T>
    serdes: SerdesMap
}
