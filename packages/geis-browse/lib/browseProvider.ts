import { BrowseProviderConfig } from './browseConfig'
import { Arg1, Arg2, BrowseType } from './browseTypes'
import { wait, click } from './actions'
import { DEFAULT_PROVIDER } from './browseConstants'
import { SuccessSession, isFailed } from './sessions'
import {
    getActions,
    getAdapter,
    invokeHandler,
    isGenerator,
} from './browseUtils'
import util from 'util'

var isGeneratorFunction = require('is-generator-function')

export function config(globalConfig: BrowseProviderConfig = {}): BrowseType {
    // @ts-expect-error
    return Object.assign(
        <T>(
            urlOrSession: string | SuccessSession,
            arg1?: Arg1<T>,
            arg2?: Arg2<T>,
            localConfig: BrowseProviderConfig = {}
        ) => {
            const { adapter = DEFAULT_PROVIDER, ...config } = {
                ...globalConfig,
                ...localConfig,
            }
            const isasync = arg1?.toString().includes('asyncGenerator')
            if (isasync) {
                return (async function* () {
                    const instance = await getAdapter(adapter)
                    const actions = getActions(arg1)
                    const session = await instance.create({
                        url: urlOrSession as string,
                        actions,
                    })
                    if (isFailed(session)) {
                        return session.error
                    }
                    const result = invokeHandler(session, arg1, arg2)
                    while (true) {
                        // @ts-expect-error
                        let itResult = await result.next()
                        if (itResult.done) {
                            await instance.destroy(session)
                            return itResult.value
                        } else {
                            yield itResult.value
                        }
                    }
                })()
            }
            if (typeof urlOrSession === 'string') {
                return new Promise(async (resolve, reject) => {
                    const instance = await getAdapter(adapter)
                    const actions = getActions(arg1)
                    const session = await instance.create({
                        url: urlOrSession,
                        actions,
                    })
                    if (isFailed(session)) {
                        return reject(session.error)
                    }
                    const result = invokeHandler(session, arg1, arg2)
                    let returnValue: any = result
                    returnValue = await result
                    await instance.destroy(session)
                    return resolve(returnValue)
                })
            } else {
                let session: SuccessSession = urlOrSession
                // if (typeof generatorOrCallback === 'function') {
                //     return generatorOrCallback(session)
                // }
                return session
            }
        },
        {
            wait,
            click,
        }
    )
}

export const browse = config()
