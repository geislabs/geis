import { AnyConfig, isBody, isHeader } from '../config'
import { FetchProtocol, FetchSubProtocol } from '../fetchTypes'
import { AnyRequestAttrs } from './requestAttrs'
import { FetchRequest } from './requestTypes'

export function buildRequest<T>(
    protocol: FetchSubProtocol,
    { method = 'get', headers = {}, ...attrs }: AnyRequestAttrs
): FetchRequest<T> {
    // const headers = configs.filter(isHeader)
    // const [body] = configs.filter(isBody)
    return {
        url: attrs.url,
        method,
        headers: Object.entries(headers).reduce(
            (acc, [name, value]) => ({ ...acc, [name]: value }),
            {}
        ),
        body: attrs.body,
        protocol,
        // body: body ? (body.value as any) : undefined,
    }
}
