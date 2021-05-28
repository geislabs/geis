import { JsonValue } from '../jsonConfig'

export function parseBoolean(value: JsonValue): boolean | Error | null {
    if (
        typeof value === 'object' ||
        (typeof value === 'string' &&
            !['true', 'false'].includes(value.toLowerCase()))
    ) {
        return Error('not a boolean')
    }
    return Boolean(value)
}
