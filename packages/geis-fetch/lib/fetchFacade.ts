import { ProtocolAdapter } from '@geislabs/geis-protocol'
import { FetchConfig } from './fetchConfig'
import { FetchRequest } from './request/requestTypes'
import { FetchResponse } from './response/responseTypes'

export class FetchAdapter
    implements ProtocolAdapter<FetchResponse, FetchRequest>
{
    constructor(public config: FetchConfig) {}

    async create<T>(request: FetchRequest<T>): Promise<FetchResponse<T>> {
        const response = await this.config.adapter(request.url, {
            method: request.method,
            headers: request.headers,
            body: request.body,
        })
        const raw =
            typeof response.body === 'string'
                ? response.body
                : await getStream(response.body)
        return { data: request.serdes.decode(raw) }
    }

    async destroy() {}
}

function getStream(stream: NodeJS.ReadableStream): Promise<string> {
    return new Promise((resolve) => {
        const chunks: any[] = []
        stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
        stream.on('end', () => resolve(Buffer.concat(chunks).toString()))
    })
}
