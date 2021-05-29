import { JsonConfig, JsonPathProvideFn } from './jsonConfig'
import { JsonPathImpl } from './jsonFacade'
import { JsonPath } from './jsonTypes'

export function Json(
    content: string | object = '',
    path?: string,
    config: Partial<JsonConfig> = {}
): JsonPath {
    const provide: JsonPathProvideFn = (inner) => {
        const instance: JsonPath = new JsonPathImpl({
            ...config,
            value: inner,
            provide,
        })
        return instance
    }

    const value =
        typeof content === 'string' ? (JSON.parse(content) as object) : content

    const instance = provide([value])
    if (path) {
        return instance.parse(path)
    }
    return instance
}
