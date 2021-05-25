import { PendingFile } from '@geislabs/geis-file'
import autobind from 'autobind-decorator'
import { toBoolean } from './boolean/booleanHelpers'
import { HtmlConfig } from './htmlConfig'
import { HtmlPath } from './htmlTypes'
import { toInteger } from './integer/integerHelpers'
import { toLink } from './link/linkHelpers'
import { toFile } from './file/fileHelpers'
import { toIterator } from './iterator/iteratorHelpers'
import { toString } from './string/stringHelpers'

@autobind
export class HtmlPathImpl implements HtmlPath {
    constructor(private config: HtmlConfig) {}

    toString() {
        return toString(this.config.node)
    }

    toInteger() {
        return toInteger(this.config.node)
    }

    toBoolean() {
        return toBoolean(this.config.node)
    }

    toLink() {
        return toLink(this.config.node)
    }

    toFile(): PendingFile | Error | null {
        if (!this.config.file) {
            throw new Error('files not configured')
        }
        return toFile(this.config.file, this)
    }

    parse(selector: string) {
        return this.config.provide(selector)
    }

    [Symbol.iterator](): Iterator<HtmlPath> {
        return toIterator(this.config)
    }
}
