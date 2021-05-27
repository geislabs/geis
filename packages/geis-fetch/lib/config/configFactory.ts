import { BodyConfig, HeaderConfig } from './configTypes'

export function header(name: string, value: unknown): HeaderConfig {
    return { kind: 'header', name, value }
}

export function body(value: unknown): BodyConfig {
    return { kind: 'body', value }
}
