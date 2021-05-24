import {
    AnySession,
    SessionAdapter,
    SessionStatus,
    buildPath,
    CreateSessionAttrs,
} from '@geislabs/geis-browse'
import { Browser, launch } from 'puppeteer-core'

let id = 0

export class PuppeteerAdapter implements SessionAdapter {
    #state: WeakMap<AnySession, Browser>

    constructor() {
        this.#state = new WeakMap()
    }

    async create(attrs: CreateSessionAttrs): Promise<AnySession> {
        const { url: location } = attrs
        const browser = await launch({
            headless: true,
            executablePath: `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`,
        })
        const page = await browser.newPage()
        const response = await page.goto(location, {
            waitUntil: 'networkidle0',
        })
        if (!response.ok()) {
            throw new Error(`location '${location}' not found`)
        }
        const content = await page.content()

        // @ts-expect-error
        const original: AnySession = {
            resourceId: (id++).toString(),
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
        }

        const proxy = new Proxy<AnySession>(original, {
            get(target, prop) {
                if (target.hasOwnProperty(prop)) {
                    // @ts-expect-error
                    return Reflect.get(...arguments)
                }
                return original.parse(prop.toString())
            },
        })
        this.#state.set(proxy, browser)
        return proxy
    }

    async destroy(session: AnySession) {
        await this.#state.get(session)?.close()
    }
}
