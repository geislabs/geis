import { ResourceProvider } from '@geislabs/geis-resource'
import { AnyAction, ClickAction, WaitAction } from './actions'
import { AnySession, SuccessSession, SessionStatus } from './sessions'

export interface Browser {
    status: SessionStatus
    location: string
}

export type BrowseResult<T> = T

export interface BrowseType extends ResourceProvider<AnyAction[], AnySession> {
    /**
     * Wait for a number of seconds
     */
    wait: (amountMs: number) => WaitAction
    /**
     * Click on element identified by selector
     * @param selector
     */
    click: (selector: string) => ClickAction
    /**
     * Navigate to path
     * @param selector
     */
    goto: (path: string) => ClickAction
}

export type Arg1<T> =
    | ((session: AnySession) => Promise<T> | Generator<T> | AsyncGenerator<T>)
    | AnyAction[]

export type Arg2<T> = (
    session: AnySession
) => Promise<T> | Generator<T> | AsyncGenerator<T>
