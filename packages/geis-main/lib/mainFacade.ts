import { config as fetchConfig } from '@geislabs/fetch'
import { createFetch as createJsonFetch } from '@geislabs/json'
import { Json } from '@geislabs/json'

/**
 * Do stuff
 * @param config
 * @returns
 */
export function config() {
    const createFetch = fetchConfig()
    const fetch = createFetch([createJsonFetch()])
    return {
        fetch,
        Json,
    }
}
