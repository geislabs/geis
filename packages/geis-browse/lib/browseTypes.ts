import { BrowseProviderConfig } from './browseConfig'
import { AnyAction, ClickAction, WaitAction } from './actions'
import { AnySession, SuccessSession, SessionStatus } from './sessions'

export interface Browser {
    status: SessionStatus
    location: string
}

export type BrowseResult<T> = T

export type BrowseType = {
    /**
     * Lol1
     */
    <T>(session: string): Promise<AnySession>
    <T>(session: AnySession): Promise<AnySession>
    /**
     * Lol2
     */
    <T>(
        session: AnySession | string,
        generator?: (session: SuccessSession) => AsyncGenerator<T>,
        config?: BrowseProviderConfig
    ): AsyncGenerator<T>
    <T>(
        session: AnySession | string,
        actions: AnyAction[],
        generator?: (session: SuccessSession) => AsyncGenerator<T>,
        config?: BrowseProviderConfig
    ): AsyncGenerator<T>
    /**
     * LOL3
     */
    <T>(
        session: AnySession | string,
        generator?: (session: SuccessSession) => Generator<T>,
        config?: BrowseProviderConfig
    ): Generator<T>
    /**
     * LOL3
     */
    <T>(
        session: AnySession | string,
        actions: AnyAction[],
        generator?: (session: SuccessSession) => Generator<T>,
        config?: BrowseProviderConfig
    ): Generator<T>
    /**
     * Creates a new browser session
     */
    <T>(
        session: AnySession | string,
        callback?: (session: SuccessSession) => Promise<T> | T,
        config?: BrowseProviderConfig
    ): Promise<
        BrowseResult<
            {
                [P in keyof T]: T[P] extends Promise<infer U> ? U : T[P]
            }
        >
    >
    /**
     * Creates a new browser session
     */
    <T>(
        session: AnySession | string,
        actions: AnyAction[],
        callback?: (session: SuccessSession) => Promise<T> | T,
        config?: BrowseProviderConfig
    ): Promise<
        BrowseResult<
            {
                [P in keyof T]: T[P] extends Promise<infer U> ? U : T[P]
            }
        >
    >
} & {
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
    | ((
          session: SuccessSession
      ) => Promise<T> | Generator<T> | AsyncGenerator<T>)
    | AnyAction[]

export type Arg2<T> = (
    session: SuccessSession
) => Promise<T> | Generator<T> | AsyncGenerator<T>
