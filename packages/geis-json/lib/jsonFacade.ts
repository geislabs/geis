import autobind from 'autobind-decorator'
import { JsonConfig } from './jsonConfig'
import { JsonPath } from './jsonTypes'

@autobind
export class JsonPathImpl implements JsonPath {
    constructor(private config: JsonConfig) {}
    toString() {
        return JSON.stringify(this.config.value)
    }
    toObject() {
        return this.config.value
    }
    parse(selector: string) {
        // @ts-expect-error
        const nested = this.config.value[selector]
        return this.config.provide(nested)
    }
    [Symbol.iterator](): Iterator<JsonPath> {
        return {
            next: () => ({ value: null, done: true }),
        }
    }
}
