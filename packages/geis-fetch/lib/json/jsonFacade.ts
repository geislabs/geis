import { Json, JsonPath } from '@geislabs/geis-json'
import { URL } from 'url'
import { AnyConfig, isBody, isHeader } from '../config'
import { FetchFn } from '../fetchConfig'
import { FetchSubProtocol } from '../fetchTypes'
import { buildRequest } from '../request/requestFactory'

export const createJson = (
    adapter: FetchFn
): FetchSubProtocol<'json', AnyConfig, object, JsonPath> => ({
    name: 'json',
    init: async () => null,
    parse: async (location, init) => {
        const url = new URL(`https://${location}`)
        const headers = init.filter(isHeader)
        const [body] = init.filter(isBody)
        if (body?.value !== undefined && typeof body.value !== 'object') {
            throw new Error('body is not object')
        }
        return buildRequest<JsonPath>({
            url: url.toString(),
            headers: headers.reduce(
                (acc, config) => ({ ...acc, [config.name]: config.value }),
                {}
            ),
            // @ts-expect-error
            body: body ? this.encode(body.value) : undefined,
        })
    },
    eval: async function* (request) {
        const response = await adapter(request)
        const raw =
            typeof response.body === 'string'
                ? response.body
                : await getStream(response.body)
        const data = Json(raw)
        yield {
            data,
            request,
            parse: data.parse,
            [Symbol.iterator]: data[Symbol.iterator],
        }
    },
    dispose: async () => undefined,
})

function getStream(stream: NodeJS.ReadableStream): Promise<string> {
    return new Promise((resolve) => {
        const chunks: any[] = []
        stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
        stream.on('end', () => resolve(Buffer.concat(chunks).toString()))
    })
}
