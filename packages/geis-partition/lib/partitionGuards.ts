import {
    AnyPartition,
    SaveableResult,
    StatefulPartition,
} from './partitionTypes'

export function isPromise<T>(
    value: Promise<T> | AsyncGenerator<T>
): value is Promise<T> {
    return typeof (value as Promise<T>).then === 'function'
}

export function isSavable<T>(
    result: IteratorResult<T>
): result is SaveableResult<T> {
    return result.done === true && result.value !== undefined
}
