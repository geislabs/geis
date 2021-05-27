import { BrowseProviderConfig } from './browseConfig'
import { Arg1, Arg2, BrowseType } from './browseTypes'
import * as facade from './browseFacade'
import { wait, click, goto, _while, take } from './actions'
import { AnySession } from './sessions'

export function config(globalConfig: BrowseProviderConfig = {}): BrowseType {
    // @ts-expect-error
    return Object.assign(
        <T>(
            urlOrSession: string | AnySession,
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
            goto,
            paginate: <T>(
                urlOrSession: string | AnySession,
                arg1?: Arg1<T>,
                arg2?: Arg2<T>,
                localConfig: BrowseProviderConfig = {}
            ) =>
                facade.paginate(urlOrSession, arg1, arg2, {
                    ...globalConfig,
                    ...localConfig,
                }),
            while: _while,
            take,
        }
    )
}

export const browse = config()
