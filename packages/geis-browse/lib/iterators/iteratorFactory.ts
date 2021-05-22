import { CheerioAPI, Node } from 'cheerio'
import { HtmlPath } from '../html'
import { CreateHtmlIteratorAttrs } from './iteratorAttrs'

export function buildIterator(
    $: CheerioAPI,
    provider: (node: Node) => HtmlPath,
    attrs: CreateHtmlIteratorAttrs
): Iterator<HtmlPath> {
    const items = $(attrs.node)
        .map((_index, node) => provider(node))
        .get()
    return items[Symbol.iterator]()
}
