import { CreateRequestAttrs } from './requestAttrs'
import { FetchRequest } from './requestTypes'

export function buildRequest<T>({
    method = 'get',
    headers = {},
    ...attrs
}: CreateRequestAttrs): FetchRequest<T> {
    return {
        url: attrs.url,
        method,
        headers: Object.entries(headers).reduce(
            (acc, [name, value]) => ({ ...acc, [name]: value }),
            {}
        ),
        body: attrs.body,
    }
}
