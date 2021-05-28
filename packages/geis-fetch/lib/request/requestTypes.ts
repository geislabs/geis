import { Subprotocol } from '@geislabs/geis-protocol'
import type { RequestInit } from 'node-fetch'
import type { URL } from 'url'
import { FetchSubProtocol } from '../fetchTypes'
import { Serdes } from '../serdes'

export interface FetchRequest<T = unknown> extends RequestInit {
    protocol: FetchSubProtocol<string, any, T>
    url: string
}
