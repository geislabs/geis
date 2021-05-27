interface BaseConfig<TKind extends string> {
    kind: TKind
}

export interface HeaderConfig extends BaseConfig<'header'> {
    name: string
    value: unknown
}

export interface BodyConfig<T = unknown> extends BaseConfig<'body'> {
    value: T
}

export type AnyConfig<T = unknown> = HeaderConfig | BodyConfig<T>
