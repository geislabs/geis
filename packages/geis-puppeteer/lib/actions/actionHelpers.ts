import { Page } from 'puppeteer-core'

export async function click(page: Page, selector: string) {
    await page.click(selector)
    return
}
