import { FileAdapter } from '@geislabs/geis-file'
import { Cheerio, Node, CheerioAPI } from 'cheerio'
import { HtmlPath } from './htmlTypes'
import { ImageAdapter } from './images/imageAdapter'

export type HtmlPathProvideFn = (node?: string | Cheerio<Node>) => HtmlPath

export interface HtmlConfig {
    file?: FileAdapter
    image?: ImageAdapter
    $: CheerioAPI
    node: Cheerio<Node>
    provide: HtmlPathProvideFn
}
