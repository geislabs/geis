import { JsonPath } from './jsonTypes'

export type JsonPathProvideFn = (value: object) => JsonPath

export interface JsonConfig {
    value: object
    provide: JsonPathProvideFn
}
