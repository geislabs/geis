import { CheerioAPI, Node } from 'cheerio'
import { SessionAdapter } from '../sessions'

export interface CreateHtmlPathAttrs {
    adapter: SessionAdapter
    $?: CheerioAPI
    value: string | Node
    selector: string
}
