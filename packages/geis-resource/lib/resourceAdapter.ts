export interface ResourceAdapter<TConf, TRes> {
    create: (config: TConf) => Promise<TRes>
    destroy: (resource: TRes) => Promise<unknown> | unknown
}
