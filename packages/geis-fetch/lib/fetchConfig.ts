import { FetchRequest } from './request'

export type FetchFn<T = any> = (
    request: FetchRequest<T>
) => Promise<{ body: string | NodeJS.ReadableStream }>

export interface FetchConfig<T = any> {
    adapter: FetchFn<T>
}
