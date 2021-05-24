import { invoke } from '@geislabs/geis-resource'
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
            const instance = getAdapter(adapter)
            const actions = getActions(arg1)

            if (typeof arg1 === 'function') {
                return invoke(
                    instance,
                    {
                        url: urlOrSession as string,
                        actions,
                    },
                    arg1
                )
            } else {
                return invoke(
                    instance,
                    {
                        url: urlOrSession as string,
                        actions,
                    },
                    // @ts-expect-error
                    arg2
                )
            }
        },
        {
            wait,
            click,
        }
    )
}

export const browse = config()
