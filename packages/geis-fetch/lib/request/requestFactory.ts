import { AnyConfig, isBody, isHeader } from '../config'
import { Serdes } from '../serdes'
import { CreateRequestAttrs } from './requestAttrs'
import { FetchRequest } from './requestTypes'

export function buildRequest<T>(
    serdes: Serdes<T>,
    configs: AnyConfig<T>[],
    attrs: CreateRequestAttrs
): FetchRequest<T> {
    const headers = configs.filter(isHeader)
    const [body] = configs.filter(isBody)
    return {
        url: attrs.url,
        method: 'get',
        headers: headers.reduce(
            (acc, config) => ({ ...acc, [config.name]: config.value }),
            {}
        ),
        body: body ? serdes.encode(body.value) : undefined,
        serdes,
    }
}
