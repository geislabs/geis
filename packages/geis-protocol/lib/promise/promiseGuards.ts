import util from 'util'
import { AnyCallbackFn, PromiseCallbackFn } from '../protocolValues'

export function isPromise<TType, TValue>(
    callback: AnyCallbackFn<TType, TValue>
): callback is PromiseCallbackFn<TType, TValue> {
    return util.types.isAsyncFunction(callback)
}
