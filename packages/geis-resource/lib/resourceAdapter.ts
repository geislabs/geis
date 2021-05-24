export interface ResourceAdapter<TConf = unknown, TRes = unknown> {
    create: (config: TConf) => Promise<TRes>
    destroy: (resource: TRes) => Promise<unknown> | unknown
}
