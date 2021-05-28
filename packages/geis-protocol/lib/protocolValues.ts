import { ProtocolResponse } from './protocolTypes'

export type SyncCallbackFn<TType, TValue> = (session: TType) => TValue

export type PromiseCallbackFn<TType, TValue> = (
    session: TType
) => Promise<TValue>

export type GeneratorCallbackFn<TType, TValue> = (
    session: TType
) => Generator<TValue>

export type AsyncGeneratorCallbackFn<TType, TValue> = (
    session: TType
) => AsyncGenerator<TValue>

export type AnyGeneratorCallbackFn<TType, TValue> =
    | GeneratorCallbackFn<TType, TValue>
    | AsyncGeneratorCallbackFn<TType, TValue>

export type AnyCallbackFn<TType, TValue> =
    | SyncCallbackFn<TType, TValue>
    | PromiseCallbackFn<TType, TValue>
    | AnyGeneratorCallbackFn<TType, TValue>
