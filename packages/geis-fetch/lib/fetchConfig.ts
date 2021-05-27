import { RequestInit, Response } from 'node-fetch'
import { FetchSubprotocol } from './fetchTypes'
import { Serdes } from './serdes'

type FetchFn = (
    url: string,
    init: RequestInit
) => Promise<{ body: string | NodeJS.ReadableStream }>

export type SerdesMap = {
    [P in keyof FetchSubprotocol]: Serdes<FetchSubprotocol[P]>
}

export interface FetchConfig {
    adapter: FetchFn
    serdes: SerdesMap
}
