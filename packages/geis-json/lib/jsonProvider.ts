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
        return proxify<JsonPath>(instance)
    }

    const value =
        typeof content === 'string' ? (JSON.parse(content) as object) : content

    return provide(value)
}

function proxify<T extends object & { parse: (selector: string) => T }>(
    value: T
): T {
    return new Proxy<T>(value, {
        get(target, prop) {
            if (prop in target || typeof prop === 'symbol') {
                // @ts-expect-error
                return Reflect.get(...arguments)
            }
            return value.parse(prop.toString())
        },
    })
}
