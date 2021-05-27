import { ResourceProvider } from '@geislabs/geis-resource'
import {
    AnyAction,
    ClickAction,
    PaginateAction,
    PaginateActions,
    TakeAction,
    WaitAction,
    WhileAction,
} from './actions'
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
    /**
     * Paginate pages
     * @param selector
     */
    paginate: (...actions: PaginateActions[]) => PaginateAction
    /**
     * Paginate pages
     * @param selector
     */
    while: (selector: string) => WhileAction
    /**
     * Paginate pages
     * @param selector
     */
    take: (count: number) => TakeAction
}

export type PromiseCallbackFn<T> = (session: AnySession) => Promise<T>
export type GeneratorCallbackFn<T> = (session: AnySession) => Generator<T>
export type AsyncGeneratorCallbackFn<T> = (
    session: AnySession
) => AsyncGenerator<T>

export type AnyCallbackFn<T> =
    | PromiseCallbackFn<T>
    | GeneratorCallbackFn<T>
    | AsyncGeneratorCallbackFn<T>

export type Arg1<T> = AnyCallbackFn<T> | AnyAction[]

export type Arg2<T> = AnyCallbackFn<T>
