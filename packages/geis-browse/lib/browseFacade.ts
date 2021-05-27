import { invoke } from '@geislabs/geis-resource'
import { PaginateActions } from './actions'
import { perform } from './actions/actionFacade'
import { BrowseProviderConfig } from './browseConfig'
import { DEFAULT_PROVIDER } from './browseConstants'
import { AnyCallbackFn, Arg1, Arg2 } from './browseTypes'
import { getActions, getAdapter } from './browseUtils'
import { performPagination } from './pagination/paginationFacade'
import { AnySession, SuccessSession } from './sessions'

export function browse<T>(
    urlOrSession: string | AnySession,
    arg1?: Arg1<T>,
    arg2?: Arg2<T>,
    localConfig: BrowseProviderConfig = {}
) {
    const { adapter = DEFAULT_PROVIDER } = localConfig
    const instance = getAdapter(adapter)
    const actions = getActions(arg1, arg2)

    if (typeof arg1 === 'function') {
        if (typeof urlOrSession === 'string') {
            return perform(
                instance,
                urlOrSession,
                [],
                // @ts-expect-error
                arg1
            )
        } else {
            return invoke(
                instance,
                {
                    session: urlOrSession,
                    actions,
                },
                // @ts-expect-error
                arg1
            )
        }
    } else {
        if (typeof urlOrSession === 'string') {
            return perform(
                instance,
                urlOrSession,
                // @ts-expect-error
                arg1,
                arg2
            )
        } else {
            return invoke(
                instance,
                {
                    session: urlOrSession,
                    actions,
                },
                // @ts-expect-error
                arg2
            )
        }
    }
}

export function paginate<T>(
    urlOrSession: string | AnySession,
    arg1?: Arg1<T>,
    arg2?: Arg2<T>,
    localConfig: BrowseProviderConfig = {}
) {
    const { adapter = DEFAULT_PROVIDER } = localConfig
    const instance = getAdapter(adapter)
    const actions = getActions(arg1, arg2)

    if (typeof arg1 === 'function') {
        if (typeof urlOrSession === 'string') {
            return performPagination(
                instance,
                urlOrSession,
                [],
                // @ts-expect-error
                arg1
            )
        } else {
            return invoke(
                instance,
                {
                    session: urlOrSession,
                    actions,
                },
                // @ts-expect-error
                arg1
            )
        }
    } else {
        if (typeof urlOrSession === 'string') {
            return performPagination(
                instance,
                urlOrSession,
                // @ts-expect-error
                arg1,
                arg2
            )
        } else {
            return invoke(
                instance,
                {
                    session: urlOrSession,
                    actions,
                },
                // @ts-expect-error
                arg2
            )
        }
    }
}
