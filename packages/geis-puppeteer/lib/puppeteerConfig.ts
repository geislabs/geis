import type { FileAdapter } from '@geislabs/geis-file'
import { LaunchOptions, PuppeteerLifeCycleEvent } from 'puppeteer-core'

export interface PuppeteerConfig {
    file?: FileAdapter
    waitfor?: PuppeteerLifeCycleEvent | PuppeteerLifeCycleEvent[]
    options: LaunchOptions
}
