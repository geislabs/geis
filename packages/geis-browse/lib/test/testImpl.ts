import { FileAdapter } from '@geislabs/geis-file'
import { Html } from '@geislabs/geis-html'
import { URL } from 'url'
import {
    SessionAdapter,
    SessionStatus,
    AnySession,
    isReused,
    SuccessSession,
} from '../sessions'
import { BrowseTestConfig } from './testConfig'
import { ContentMap } from './testValues'
import { applyActions } from './testUtils'
import { AnySessionAttrs } from '../sessions/sessionAttrs'

export class BrowseTestAdapter implements SessionAdapter {
    #content: ContentMap

    public file?: FileAdapter

    constructor(public config: BrowseTestConfig) {
        this.#content = config.content ?? {}
        this.file = config.file
    }

    async create(attrs: AnySessionAttrs): Promise<AnySession> {
        const location = isReused(attrs) ? attrs.session.location : attrs.url
        const actions = attrs.actions
        let nextlocation = actions.reduce((acc, action) => {
            if (action.kind !== 'goto') {
                return acc
            }
            const current = new URL(acc)
            current.pathname = action.path
            return current.toString()
        }, location)

        const pageContent = this.#content[nextlocation]
        const rendered = applyActions(pageContent, [])

        if (!rendered) {
            throw new Error(`location '${nextlocation}' not found`)
        }

        // @ts-expect-error
        const original: AnySession = {
            location: nextlocation,
            status: SessionStatus.OK,
            parse: (selector) => Html(rendered, selector, { file: this.file }),
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

    async click(session: AnySession, selector: string) {
        const pageContent = this.#content[session.location]
        const rendered = applyActions(pageContent, [
            { kind: 'click', selector },
        ])
        this.#content[session.resourceId] = rendered
        const original = {
            ...session,
            parse: (selector) => Html(rendered, selector, { file: this.file }),
            toString: () => rendered,
        } as SuccessSession

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
