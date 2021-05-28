import fetch from 'node-fetch'
import { FetchFn } from '../fetchConfig'

export const nodeFetch: FetchFn<unknown> = async (request) => {
    const response = await fetch(request.url.toString(), {
        method: request.method,
        body: request.body,
    })
    return { body: response.body }
}
