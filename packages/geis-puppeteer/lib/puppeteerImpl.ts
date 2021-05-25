import {
    AnySession,
    SessionAdapter,
    SessionStatus,
    AnySessionAttrs,
    isReused,
} from '@geislabs/geis-browse'
import { Html } from '@geislabs/geis-html'
import { Browser, launch, Page } from 'puppeteer-core'
import { PuppeteerConfig } from './puppeteerConfig'

let id = 0

export class PuppeteerAdapter implements SessionAdapter {
    #state: WeakMap<AnySession, [Browser, Page]>

    constructor(public config: PuppeteerConfig = {}) {
        this.#state = new WeakMap()
    }

    async create(attrs: AnySessionAttrs): Promise<AnySession> {
        const [maybeBrowser, maybePage] = isReused(attrs)
            ? this.#state.get(attrs.session) ?? []
            : []

        const browser =
            maybeBrowser ??
            (await launch({
                headless: true,
                executablePath: `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`,
            }))

        const page = maybePage ?? (await browser.newPage())
        const location = isReused(attrs) ? attrs.session.location : attrs.url

        const response = await page.goto(location, {
            waitUntil: 'networkidle0',
        })
        // if (!response.ok()) {
        //     console.error(response.status(), response.statusText())
        //     throw new Error(`location '${location}' not found`)
        // }
        const content = await page.content()

        // @ts-expect-error
        const original: AnySession = {
            resourceId: (id++).toString(),
            location,
            status: SessionStatus.OK,
            parse: (selector) =>
                Html(content, selector, { file: this.config.file }),
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
        this.#state.set(proxy, [browser, page])
        return proxy
    }

    async destroy(session: AnySession) {
        await this.#state.get(session)?.[0].close()
    }
}
