import cheerio, { Node } from 'cheerio'
import { CreateHtmlPathAttrs } from './htmlAttrs'
import { HtmlPath } from './htmlTypes'
import { buildLink } from '../links'
import { buildFile } from '../files'
import { buildIterator } from '../iterators'
import { assertFilesSupported } from './htmlAssertions'

export function buildPath(config: CreateHtmlPathAttrs): HtmlPath {
    const adapter = config.adapter
    const $ = config.$ ? config.$ : cheerio.load(config.value)
    // @ts-expect-error
    const node: Node =
        typeof config.value === 'string' ? $(config.selector) : config.value
    const selector = config.selector
    return {
        parse(selector: string) {
            return buildPath({ ...config, selector })
        },
        toString() {
            const value = $(node).text()
            if (value.trim() === '') {
                return null
            }
            return value.trim()
        },
        toInteger() {
            const value = $(node).text()
            const casted = Number(value)
            return isNaN(casted) ? null : casted
        },
        toLink() {
            return buildLink($, {
                node,
                selector,
            })
        },
        toFile() {
            assertFilesSupported(adapter.file)
            return buildFile(adapter.file, $, {
                node,
                selector,
            })
        },
        [Symbol.iterator](): Iterator<HtmlPath> {
            return buildIterator(
                $,
                (node) => buildPath({ ...config, value: node }),
                {
                    node,
                    selector,
                }
            )
        },
    }
}
