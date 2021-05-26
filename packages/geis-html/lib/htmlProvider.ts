import { Cheerio, load, Node } from 'cheerio'
import getUniquePath from 'cheerio-get-css-selector'
import { HtmlConfig, HtmlPathProvideFn } from './htmlConfig'
import { HtmlPathImpl } from './htmlFacade'
import { HtmlPath } from './htmlTypes'

export function Html(
    content: string = '',
    selector?: string,
    config: Partial<HtmlConfig> = {}
): HtmlPath {
    const $ = load(content)
    getUniquePath.init($)
    const provide: HtmlPathProvideFn = (inner) => {
        let node: Cheerio<Node>
        if (typeof inner === 'string') {
            node = $(inner)
        } else if (typeof inner === 'object') {
            node = $(inner)
        } else {
            node = $.root()
        }
        const instance = new HtmlPathImpl({ ...config, $, node, provide })
        return proxify<HtmlPath>(instance)
    }

    return provide(selector)
}

function proxify<T extends object & { parse: (selector: string) => T }>(
    value: T
): T {
    return new Proxy<T>(value, {
        get(target, prop) {
            if (prop in target || typeof prop === 'symbol') {
                // @ts-expect-error
                return Reflect.get(...arguments)
            }
            return value.parse(prop.toString())
        },
    })
}
