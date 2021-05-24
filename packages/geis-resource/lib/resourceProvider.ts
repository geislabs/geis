export interface ResourceProvider<TConf, TRes> {
    (target: string, config?: TConf): Promise<TRes & { dispose: () => void }>
    <TOut>(target: string, callback: (resource: TRes) => TOut): TOut
    <TOut>(
        target: string,
        config: TConf,
        callback: (resource: TRes) => TOut
    ): TOut
}
