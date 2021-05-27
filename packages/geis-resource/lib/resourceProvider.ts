export interface ResourceProvider<TConf, TRes, TContext = undefined> {
    (target: string | TRes, config?: TConf): Promise<
        TRes & { dispose: () => void }
    >
    <TOut>(
        target: string | TRes,
        callback: (resource: TRes, context: TContext) => TOut
    ): Promise<TOut>
    <TOut>(
        target: string | TRes,
        config: TConf,
        callback: (resource: TRes, context: TContext) => TOut
    ): Promise<TOut>
}

export type ResourceCallback<TRes, TOut = any> =
    | ((resource: TRes) => TOut)
    | ((resource: TRes) => Promise<TOut>)
    | ((resource: TRes) => AsyncGenerator<TOut>)
    | ((resource: TRes) => Generator<TOut>)
