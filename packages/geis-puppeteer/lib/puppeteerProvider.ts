import { PuppeteerAdapter } from './puppeteerImpl'

export function puppeteer() {
    return new PuppeteerAdapter()
}
