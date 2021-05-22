export interface JsonPath extends Iterable<JsonPath> {
    // @ts-expect-error
    value: object
    // @ts-expect-error
    get: (selector: string) => JsonPath
    // @ts-expect-error
    toString: () => string | null
    // @ts-expect-error
    toText: () => string | null
    // @ts-expect-error
    toInteger: () => number | Error | null
    // @ts-expect-error
    path: string[]
    [key: string]: JsonPath
}
