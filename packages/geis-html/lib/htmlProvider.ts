import { load } from 'cheerio'
import { HtmlConfig, HtmlPathProvideFn } from './htmlConfig'
import { HtmlPathImpl } from './htmlFacade'
import { HtmlPath } from './htmlTypes'

export function Html(
    content: string = '',
    selector?: string,
    config: Partial<HtmlConfig> = {}
): HtmlPath {
    const $ = load(content)

    const provide: HtmlPathProvideFn = (inner) => {
        const node = inner ? $(inner) : $.root()
        return new HtmlPathImpl({ ...config, $, node, provide })
    }

    return provide(selector)
}
