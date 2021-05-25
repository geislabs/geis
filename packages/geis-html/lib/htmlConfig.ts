import { FileAdapter } from '@geislabs/geis-file'
import { Cheerio, Node, CheerioAPI } from 'cheerio'
import { HtmlPath } from './htmlTypes'

export type HtmlPathProvideFn = (node?: string | Cheerio<Node>) => HtmlPath

export interface HtmlConfig {
    file?: FileAdapter
    $: CheerioAPI
    node: Cheerio<Node>
    provide: HtmlPathProvideFn
}
