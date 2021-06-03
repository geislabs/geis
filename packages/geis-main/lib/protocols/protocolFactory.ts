import { config } from '@geislabs/fetch'
import { createFetch as createJson } from '@geislabs/json-fetch'
import { Http } from '@geislabs/http'
import { plugin } from '@geislabs/runtime'

export function fromFetch(httpDependency: Http) {
    return plugin({
        name: 'fetch',
        depends: [httpDependency],
        register({ http }) {
            const createFetch = config((request) => {
                return http.request(request)
            })
            const fetch = createFetch([createJson()])
            return fetch
        },
    })
}
