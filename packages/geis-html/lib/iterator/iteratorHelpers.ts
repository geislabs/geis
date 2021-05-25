import { HtmlConfig } from '../htmlConfig'
import { HtmlPath } from '../htmlTypes'

export function toIterator(config: HtmlConfig): Iterator<HtmlPath> {
    const items = config.node
        .map((_index, node) => config.provide(config.$(node)))
        .get()
    return items[Symbol.iterator]()
}
