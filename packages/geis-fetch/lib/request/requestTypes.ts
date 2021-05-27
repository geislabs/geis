import type { RequestInit } from 'node-fetch'
import { Serdes } from '../serdes'

export interface FetchRequest<T = unknown> extends RequestInit {
    url: string
    serdes: Serdes<T>
}
