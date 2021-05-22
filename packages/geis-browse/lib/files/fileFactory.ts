import { create as createFile, FileAdapter } from '@geislabs/lib-file'
import { CheerioAPI } from 'cheerio'
import { buildLink } from '../links'
import { CreateHtmlFileAttrs } from './fileAttrs'

export function buildFile(
    adapter: FileAdapter,
    $: CheerioAPI,
    attrs: CreateHtmlFileAttrs
) {
    const link = buildLink($, attrs)
    if (link instanceof Error) {
        throw link
    }
    const pending = createFile(adapter, {
        filename: link.name,
        downloadUrl: link.href,
    })
    return pending
}
