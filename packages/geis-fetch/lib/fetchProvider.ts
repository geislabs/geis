import { createProtocol } from '@geislabs/geis-protocol'
import { header, body } from './config'
import { FetchFn } from './fetchConfig'
import { FetchProtocol } from './fetchTypes'
import { createJson } from './json/jsonFacade'
import { nodeFetch } from './node/nodeFacade'

/**
 * Create fetch API
 * @param adapter
 * @returns
 */
export const config = (adapter: FetchFn = nodeFetch): FetchProtocol =>
    Object.assign(
        createProtocol({
            json: createJson(adapter),
        }),
        {
            header,
            body,
        }
    )

/**
 * Fetch resources
 */
export const fetch: FetchProtocol = config(nodeFetch)
