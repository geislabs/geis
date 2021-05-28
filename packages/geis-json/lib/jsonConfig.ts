import { JsonPath } from './jsonTypes'

export type JsonValue = object | string | number | boolean
export type JsonPathProvideFn = (value: JsonSelection) => JsonPath
export type JsonSelection = JsonValue[]

export interface JsonConfig {
    value: JsonSelection
    provide: JsonPathProvideFn
}
