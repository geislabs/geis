import { PuppeteerConfig } from './puppeteerConfig'
import { PuppeteerAdapter } from './puppeteerImpl'

export function puppeteer({
    options = {},
    ...config
}: Partial<PuppeteerConfig> = {}) {
    return new PuppeteerAdapter({ options, ...config })
}
