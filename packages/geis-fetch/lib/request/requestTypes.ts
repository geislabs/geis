import type { RequestInit } from 'node-fetch'

export interface FetchRequest<T = unknown> extends RequestInit {
    url: string
}
