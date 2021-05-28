import { JsonValue } from '../jsonConfig'

export function parseInteger(value: JsonValue): number | Error {
    if (typeof value === 'object') {
        return Error('not a number')
    }
    const result = Number(value)
    if (isNaN(result)) {
        return Error('not a number')
    }
    return result
}
