import util from 'util'
import {
    AnyCallbackFn,
    AsyncGeneratorCallbackFn,
    GeneratorCallbackFn,
} from '../protocolValues'

export function isAsyncGenerator<TType, TValue>(
    callback: AnyCallbackFn<TType, TValue>
): callback is AsyncGeneratorCallbackFn<TType, TValue> {
    return callback.toString().includes('asyncGenerator')
}

export function isGenerator<TType, TValue>(
    callback: AnyCallbackFn<TType, TValue>
): callback is GeneratorCallbackFn<TType, TValue> {
    return util.types.isGeneratorFunction(callback)
}
