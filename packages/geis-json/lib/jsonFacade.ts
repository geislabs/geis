// import { JsonPath } from './jsonTypes'
import jp from 'jsonpath'

const json: unique symbol = Symbol()

export interface JsonPath extends Iterable<JsonPath> {
    [json]: {
        path: string[]
        value: object
    }
    get: (selector: string) => JsonPath
    toString: () => string | null
    toText: () => string | null
    toInteger: () => number | Error | null
}

export function Json(value: object): JsonPath
export function Json(value: string): JsonPath
export function Json(value: string | object): JsonPath | Error {
    const parsedValue = parseValue(value)
    if (parsedValue instanceof Error) {
        return parsedValue
    }
    const original: JsonPath = {
        [json]: {
            path: [],
            value: parsedValue,
        },
        [Symbol.iterator]() {
            // @ts-expect-error
            const path = this.path.join('.')
            const values = jp.value(parsedValue, path)
            return values.map((value: any) => {
                const child = Json(value)
                // @ts-expect-error
                child.path = [...this.path]
                return child
            })
        },
        get(selector: string) {
            // @ts-expect-error
            return { ...this, path: [...this.path, selector] }
        },
        toText() {
            return ''
        },
        toString() {
            return ''
        },
        toInteger() {
            // @ts-expect-error
            const path = this.path.join('.')
            const value = jp.value(parsedValue, path)
            if (typeof value === 'number') {
                return value
            }
            const casted = Number(value)
            return isNaN(casted) ? null : casted
        },
    }

    return original
    // return new Proxy(original, {
    //     get(target, property, receiver) {
    //         if (target.hasOwnProperty(property)) {
    //             // @ts-expect-error
    //             return Reflect.get(...arguments)
    //         }
    //         const next = Json(target.value)
    //         next.path = [...target.path, property.toString()]
    //         return next
    //     },
    // })
}

function parseValue(raw: string | object) {
    if (typeof raw !== 'string') {
        return raw
    }
    if (isJSON(raw)) {
        try {
            return JSON.parse(raw)
        } catch (error) {
            return error
        }
    }
    return Error('invalid json')
}

function isJSON(MyTestStr: string) {
    try {
        var MyJSON = JSON.stringify(MyTestStr)
        var json = JSON.parse(MyJSON)
        if (typeof MyTestStr == 'string')
            if (MyTestStr.length == 0) return false
    } catch (e) {
        return false
    }
    return true
}
