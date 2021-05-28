import { JsonSelection, JsonValue } from '../jsonConfig'

export function map<T>(
    value: JsonSelection,
    callback: (value: JsonValue) => T | Error
): Array<T | Error> {
    return value.flatMap((inner) => {
        return Array.isArray(inner) ? inner.map(callback) : [callback(inner)]
    })
}
