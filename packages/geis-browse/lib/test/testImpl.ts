import { SessionAdapter, SessionStatus, AnySession } from '../sessions'
import { AnyAction } from '../actions'
import { BrowseTestConfig } from './testConfig'
import { ContentMap } from './testValues'
import { applyActions } from './testUtils'
import { FileAdapter } from '@geis-studio/lib-file'
import { buildPath } from '../html/htmlFactory'

export class BrowseTestAdapter implements SessionAdapter {
    #content: ContentMap

    public file?: FileAdapter

    constructor(public config: BrowseTestConfig) {
        this.#content = config.content ?? {}
        this.file = config.file
    }

    async findOne(location: string, actions: AnyAction[]): Promise<AnySession> {
        const pageContent = this.#content[location]
        const rendered = applyActions(pageContent, actions)
        if (!rendered) {
            // @ts-expect-errore
            return {
                location,
                status: SessionStatus.ERROR,
                error: new Error(`location '${location}' not found`),
                dispose: async () => undefined,
            }
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
            dispose: async () => undefined,
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
