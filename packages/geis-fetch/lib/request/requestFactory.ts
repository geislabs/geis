import { AnyConfig, isBody, isHeader } from '../config'
import { buildUrl } from '../url/urlFacade'
import { Serdes } from '../serdes'
import { AnyRequestAttrs } from './requestAttrs'
import { FetchRequest } from './requestTypes'
import { isStringInit } from './requestGuards'

export function buildRequest<T>(
    serdes: Serdes<T>,
    configs: AnyConfig<T>[],
    attrs: AnyRequestAttrs
): FetchRequest<T> {
    const headers = configs.filter(isHeader)
    const [body] = configs.filter(isBody)
    const { url, method = 'get' } = isStringInit(attrs) ? { url: attrs } : attrs
    return {
        url: buildUrl(url),
        method,
        headers: headers.reduce(
            (acc, config) => ({ ...acc, [config.name]: config.value }),
            {}
        ),
        body: body ? serdes.encode(body.value) : undefined,
        serdes,
    }
}
