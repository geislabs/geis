import { Resource } from '@geis-studio/lib-resource'
import { Castable, MaybeType } from '@geis-studio/lib-type'
import { IntegerType, StringType } from '@geis-studio/lib-core'
import { SessionStatus } from './sessionEnums'
import { HtmlPath } from '../html/htmlTypes'

interface SessionBase<TStatus extends SessionStatus> extends Resource {
    // @ts-expect-error
    status: TStatus
    // @ts-expect-error
    location: string
    // @ts-expect-error
    [selector: string]: HtmlPath
}

// @ts-expect-error
export interface SuccessSession
    extends SessionBase<SessionStatus.OK>,
        Castable<StringType | MaybeType<IntegerType>> {
    // @ts-expect-error
    parse: (selector: string) => HtmlPath
}

export interface FailedSession extends SessionBase<SessionStatus.ERROR> {
    // @ts-expect-error
    error: Error
}

export type AnySession = SuccessSession | FailedSession
