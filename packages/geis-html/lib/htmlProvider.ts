import { load } from 'cheerio'
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
        const node = inner ? $(inner) : $.root()
        return new HtmlPathImpl({ ...config, $, node, provide })
    }

    return provide(selector)
}
