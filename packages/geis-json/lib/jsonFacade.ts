import { GetValueType, Typeable } from '@geislabs/geis-type'
import autobind from 'autobind-decorator'
import { parseArray } from './array/arrayFacade'
import { parseBoolean } from './boolean/booleanFacade'
import { parseInteger } from './integer/integerFacade'
import { buildIterator } from './iterator/iteratorFacade'
import { JsonConfig } from './jsonConfig'
import { JsonPath } from './jsonTypes'
import { parseObject } from './object/objectFacade'
import { parse } from './parse/parseFacade'
import { parseString } from './string/stringFacade'

@autobind
export class JsonPathImpl implements JsonPath {
    constructor(private config: JsonConfig) {}

    toString(value = this.config.value) {
        return parseString(value)
    }

    toInteger(value = this.config.value[0]) {
        return parseInteger(value)
    }

    toBoolean(value = this.toString()) {
        return parseBoolean(value)
    }

    toArray<T extends Typeable>(type: T): GetValueType<T>[] | Error | null {
        return parseArray<T>(this.config.value, type, this)
    }

    toObject() {
        return parseObject(this.config.value)
    }

    parse(selector: string) {
        return parse(this.config.provide, this.config.value, selector)
    }

    [Symbol.iterator](): Iterator<JsonPath> {
        return buildIterator(this.config.provide, this.config.value)
    }
}
