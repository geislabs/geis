import { BrowseProviderConfig } from './browseConfig'
import { Arg1, Arg2, BrowseType } from './browseTypes'
import * as facade from './browseFacade'
import { wait, click } from './actions'
import { SuccessSession } from './sessions'

export function config(globalConfig: BrowseProviderConfig = {}): BrowseType {
    // @ts-expect-error
    return Object.assign(
        <T>(
            urlOrSession: string | SuccessSession,
            arg1?: Arg1<T>,
            arg2?: Arg2<T>,
            localConfig: BrowseProviderConfig = {}
        ) =>
            facade.browse(urlOrSession, arg1, arg2, {
                ...globalConfig,
                ...localConfig,
            }),
        {
            wait,
            click,
        }
    )
}

export const browse = config()
