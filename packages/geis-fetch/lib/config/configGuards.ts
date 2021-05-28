import { AnyConfig, BodyConfig, HeaderConfig } from './configTypes'

export function isHeader<T>(config: AnyConfig<T>): config is HeaderConfig {
    return config.kind === 'header'
}

export function isBody<T>(config: AnyConfig<T>): config is BodyConfig<T> {
    return config.kind === 'body'
}
