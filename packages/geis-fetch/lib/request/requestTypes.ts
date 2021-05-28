import type { RequestInit } from 'node-fetch'
import type { URL } from 'url'
import { Serdes } from '../serdes'

export interface FetchRequest<T = unknown> extends RequestInit {
    url: URL
    serdes: Serdes<T>
}
