import { runGenerator } from './generator/generatorFacade'
import { isAsyncGenerator, isGenerator } from './generator/generatorGuards'
import { runPromise } from './promise/promiseFacade'
import { ProtocolAdapter } from './protocolAdapter'
import {
    AnyCallbackFn,
    AnyGeneratorCallbackFn,
    PromiseCallbackFn,
    SyncCallbackFn,
} from './protocolValues'

export function run<TType, TInit, TValue>(
    protocol: ProtocolAdapter<TType, TInit>,
    config: TInit,
    callback: AnyGeneratorCallbackFn<TType, TValue>
): AsyncGenerator<TValue>
export function run<TType, TInit, TValue>(
    protocol: ProtocolAdapter<TType, TInit>,
    config: TInit,
    callback: PromiseCallbackFn<TType, TValue> | SyncCallbackFn<TType, TValue>
): Promise<TValue>
export function run<TType, TInit, TValue>(
    protocol: ProtocolAdapter<TType, TInit>,
    config: TInit,
    callback: AnyCallbackFn<TType, TValue>
) {
    if (isGenerator(callback) || isAsyncGenerator(callback)) {
        return runGenerator(protocol, config, callback)
    }
    return runPromise(protocol, config, callback)
}
