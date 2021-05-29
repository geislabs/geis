import { ProtocolResponse } from '../protocolTypes'

export function proxify<T extends ProtocolResponse>(value: T): T {
    return new Proxy<T>(value, {
        get(target, prop) {
            if (
                prop in target ||
                typeof prop === 'symbol' ||
                prop.toString().startsWith('$$')
            ) {
                // @ts-expect-error
                return Reflect.get(...arguments)
            }
            return value.parse(prop.toString())
        },
    })
}
