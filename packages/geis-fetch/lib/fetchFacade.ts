import { ProtocolAdapter } from '@geislabs/geis-protocol'
import { FetchConfig } from './fetchConfig'
import { FetchRequest } from './request/requestTypes'
import { FetchResponse } from './response/responseTypes'

export class FetchAdapter
    implements ProtocolAdapter<FetchResponse, FetchRequest>
{
    constructor(public config: FetchConfig) {}

    async create<T>(request: FetchRequest<T>): Promise<FetchResponse<T>> {
        // const response = await this.config.adapter(request)
        // const raw =
        //     typeof response.body === 'string'
        //         ? response.body
        //         : await getStream(response.body)
        for await (const response of request.protocol.eval(request)) {
            return response
        }
        throw new Error('no response')
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
