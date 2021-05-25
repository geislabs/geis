import { PuppeteerConfig } from './puppeteerConfig'
import { PuppeteerAdapter } from './puppeteerImpl'

export function puppeteer({ ...config }: Partial<PuppeteerConfig> = {}) {
    return new PuppeteerAdapter(config)
}
