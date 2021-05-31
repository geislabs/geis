import { config as fetchConfig } from '@geislabs/fetch'
import { Json, createFetch as jsonFetch } from '@geislabs/json'
import { Html, createFetch as htmlFetch } from '@geislabs/html'

/**
 * Do stuff
 * @param config
 * @returns
 */
export function config() {
    const createFetch = fetchConfig()
    const fetch = createFetch([jsonFetch(), htmlFetch()])
    return {
        fetch,
        Json,
        Html,
    }
}
