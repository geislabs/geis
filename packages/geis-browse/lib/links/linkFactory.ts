import { CheerioAPI } from 'cheerio'
import { CreateHtmlLinkAttrs } from './linkAttrs'

export function buildLink($: CheerioAPI, attrs: CreateHtmlLinkAttrs) {
    const href = $(attrs.node).attr('href')
    if (!href) {
        return new Error(`element at '${attrs.selector}' is not a valid link`)
    }
    return { name: $(attrs.node).text(), href }
}
