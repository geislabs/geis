import { run } from './protocolFacade'
import { ProtocolAdapter } from './protocolAdapter'
import { AnyCallbackFn } from './protocolValues'

export function protocol<TType, TInit, TValue>(
    adapter: ProtocolAdapter<TType, TInit>,
    callback: AnyCallbackFn<TType, TValue>
) {
    return (config: TInit) =>
        // @ts-expect-error
        run<TType, TInit, TValue>(adapter, config, callback)
}
