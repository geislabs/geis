import { getName, GetValueType, Typeable } from '@geislabs/geis-type'
import { extractErrors } from '../error/errorHelpers'
import { JsonSelection } from '../jsonConfig'
import { JsonPath } from '../jsonTypes'
import { map } from '../map/mapHelpers'

export function parseArray<T extends Typeable>(
    value: JsonSelection,
    type: T,
    path: JsonPath
): GetValueType<T>[] | Error | null {
    // @ts-expect-error
    const fn = path[getName(type)]
    if (typeof fn !== 'function') {
        throw new Error('not a function')
    }
    const mapped = map(value, fn) as Array<GetValueType<T> | Error>
    return extractErrors(mapped)
}
