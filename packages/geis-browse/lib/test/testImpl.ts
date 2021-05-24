import { FileAdapter } from '@geislabs/geis-file'
import { SessionAdapter, SessionStatus, AnySession } from '../sessions'
import { BrowseTestConfig } from './testConfig'
import { ContentMap } from './testValues'
import { applyActions } from './testUtils'
import { buildPath } from '../html/htmlFactory'
import { CreateSessionAttrs } from '../sessions/sessionAttrs'

export class BrowseTestAdapter implements SessionAdapter {
    #content: ContentMap

    public file?: FileAdapter

    constructor(public config: BrowseTestConfig) {
        this.#content = config.content ?? {}
        this.file = config.file
    }

    async create(attrs: CreateSessionAttrs): Promise<AnySession> {
        const location = attrs.url
        const actions = attrs.actions
        const pageContent = this.#content[location]
        const rendered = applyActions(pageContent, actions)
        if (!rendered) {
            throw new Error(`location '${location}' not found`)
        }

        // @ts-expect-error
        const original: AnySession = {
            location,
            status: SessionStatus.OK,
            parse: (selector) =>
                buildPath({
                    adapter: this,
                    selector,
                    value: rendered,
                }),
            toString: () => rendered ?? '<html>hello</html>',
            toInteger: () => 15 ?? null,
        }

        return new Proxy<AnySession>(original, {
            get(target, prop) {
                if (target.hasOwnProperty(prop)) {
                    // @ts-expect-error
                    return Reflect.get(...arguments)
                }
                return original.parse(prop.toString())
            },
        })
    }

    destroy(session: AnySession) {
        return
    }
}
