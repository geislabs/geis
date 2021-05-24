export interface ResourceProvider<TConf, TRes> {
    (target: string, config?: TConf): Promise<TRes & { dispose: () => void }>
    <TOut>(target: string, callback: (resource: TRes) => TOut): TOut
    <TOut>(
        target: string,
        config: TConf,
        callback: (resource: TRes) => TOut
    ): TOut
}

export type ResourceCallback<TRes, TOut = any> =
    | ((resource: TRes) => TOut)
    | ((resource: TRes) => Promise<TOut>)
    | ((resource: TRes) => AsyncGenerator<TOut>)
    | ((resource: TRes) => Generator<TOut>)
