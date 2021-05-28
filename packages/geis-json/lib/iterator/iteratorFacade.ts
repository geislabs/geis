import { JsonPathProvideFn, JsonSelection } from '../jsonConfig'
import { JsonPath } from '../jsonTypes'

export function buildIterator(
    provide: JsonPathProvideFn,
    value: JsonSelection
): Iterator<JsonPath> {
    const mapped = value.flatMap((inner) =>
        Array.isArray(inner)
            ? inner.map((inner) => provide([inner]))
            : provide([inner])
    )
    return mapped[Symbol.iterator]()
}
