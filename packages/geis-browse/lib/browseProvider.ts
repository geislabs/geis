import { BrowseProviderConfig } from './browseConfig'
import { Arg1, Arg2, BrowseType } from './browseTypes'
import { wait, click } from './actions'
import { DEFAULT_PROVIDER } from './browseConstants'
import { SuccessSession, isFailed } from './sessions'
import { getActions, getAdapter, invokeHandler } from './browseUtils'

export function config(globalConfig: BrowseProviderConfig = {}): BrowseType {
    // @ts-expect-error
    return Object.assign(
        async <T>(
            urlOrSession: string | SuccessSession,
            arg1?: Arg1<T>,
            arg2?: Arg2<T>,
            localConfig: BrowseProviderConfig = {}
        ) => {
            const { adapter = DEFAULT_PROVIDER, ...config } = {
                ...globalConfig,
                ...localConfig,
            }
            if (typeof urlOrSession === 'string') {
                const instance = await getAdapter(adapter)
                const actions = getActions(arg1)
                const session = await instance.findOne(urlOrSession, actions)
                if (isFailed(session)) {
                    return session.error
                }
                return invokeHandler(session, arg1, arg2)
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
