import {
    AnyAction,
    AnySession,
    SessionAdapter,
    SessionStatus,
    buildPath,
} from '@geislabs/geis-browse'
import { launch } from 'puppeteer-core'

export class PuppeteerAdapter implements SessionAdapter {
    async findOne(location: string, actions: AnyAction[]): Promise<AnySession> {
        const browser = await launch({
            headless: true,
            executablePath: `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`,
        })
        const page = await browser.newPage()
        const response = await page.goto(location, {
            waitUntil: 'networkidle0',
        })
        if (!response.ok()) {
            // @ts-expect-error
            return {
                location,
                status: SessionStatus.ERROR,
                error: new Error(`location '${location}' not found`),
                dispose: async () => {
                    return browser.close()
                },
            }
        }
        const content = await page.content()
        // @ts-expect-error
        const original: AnySession = {
            location,
            status: SessionStatus.OK,
            parse: (selector) =>
                buildPath({
                    adapter: this,
                    selector,
                    value: content,
                }),
            toString: () => content,
            toInteger: () => 15 ?? null,
            dispose: async () => {
                return browser.close()
            },
        }

        return new Proxy<AnySession>(original, {
            get(target, prop) {
                if (target.hasOwnProperty(prop)) {
                    // @ts-expect-error
                    return Reflect.get(...arguments)
                }
                // @ts-expect-error
                return original.parse(prop.toString())
            },
        })
    }
}
