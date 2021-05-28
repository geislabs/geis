import jp from 'jsonpath'
import { JsonPathProvideFn, JsonSelection } from '../jsonConfig'
import { JsonPath } from '../jsonTypes'

export function parse(
    provide: JsonPathProvideFn,
    value: JsonSelection,
    selector: string
): JsonPath {
    const nested = value.flatMap((value) => jp.query(value, selector))
    return provide(nested)
}
