export type PritimivePartition = number | string | boolean | object

export interface StatefulPartition<T = object> {
    save: (next: T) => Promise<void>
}

export type AnyPartition = PritimivePartition | StatefulPartition

type NonUndefined<T> = T extends undefined ? never : T

export interface SaveableResult<TReturn>
    extends IteratorReturnResult<NonUndefined<TReturn>> {}
