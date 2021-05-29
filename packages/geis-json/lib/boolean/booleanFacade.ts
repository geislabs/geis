import { JsonValue } from '../jsonConfig'

export function parseBoolean(value: JsonValue | null): boolean | Error | null {
    if (value === null) {
        return value
    }
    if (
        typeof value === 'object' ||
        (typeof value === 'string' &&
            !['true', 'false'].includes(value.toLowerCase()))
    ) {
        return Error('not a boolean')
    }
    return Boolean(value)
}
