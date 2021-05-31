import {
    AnySession,
    SessionAdapter,
    SessionStatus,
    AnySessionAttrs,
    isReused,
} from '@geislabs/geis-browse'
import { PendingFile } from '@geislabs/geis-file'
import { Html } from '@geislabs/html'
import { Browser, launch, Page } from 'puppeteer-core'
import { PuppeteerConfig } from './puppeteerConfig'

let id = 0

export class PuppeteerAdapter implements SessionAdapter {
    #state: WeakMap<AnySession, [Browser, Page]>

    constructor(public config: PuppeteerConfig) {
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
                ...this.config.options,
            }))

        const page = maybePage ?? (await browser.newPage())
        const location = isReused(attrs) ? attrs.session.location : attrs.url

        await page.goto(location, {
            waitUntil: this.config.waitfor ?? 'networkidle0',
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
            parse: (selector) => {
                return Html(content, selector, {
                    file: this.config.file,
                    image: {
                        create: (selector) => {
                            return new Promise(async (resolve, reject) => {
                                try {
                                    const element = await page.$(selector)
                                    const box = await element?.boundingBox()
                                    if (!box) {
                                        return null
                                    }
                                    const x = box['x'] // coordinate x
                                    const y = box['y'] // coordinate y
                                    const w = box['width'] // area width
                                    const h = box['height']
                                    const image = await page.screenshot({
                                        clip: {
                                            x: x,
                                            y: y,
                                            width: w,
                                            height: h,
                                        },
                                    })
                                    if (!this.config.file) {
                                        throw new Error(
                                            `cannot screenshot without file adapter`
                                        )
                                    }
                                    return resolve(
                                        await this.config.file.upload({
                                            filename: 'random.png',
                                            stream: image as Buffer,
                                        })
                                    )
                                } catch (error) {
                                    return reject(error)
                                }
                            }) as PendingFile
                        },
                    },
                })
            },
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

    async click(session: AnySession, selector: string) {
        const [, page] = this.#state.get(session) ?? []
        if (!page) {
            throw new Error(`page not found for session`)
        }
        await page.click(selector)
        return session
    }

    async has(session: AnySession, selector: string) {
        const [, page] = this.#state.get(session) ?? []
        if (!page) {
            throw new Error(`page not found for session`)
        }
        const exists = (await page
            .$eval(selector, () => true)
            .catch(() => false)) as boolean
        return exists
    }
}
