declare module 'cheerio-get-css-selector' {
    import { CheerioAPI } from 'cheerio'
    export function init(cheerio: CheerioAPI): void
}

declare module 'cheerio' {
    import { Cheerio as CheerioOld } from 'cheerio'
    export { CheerioAPI, Node } from 'cheerio'
    export interface Cheerio<T> extends CheerioOld<T> {
        getUniqueSelector: () => string
    }
}
