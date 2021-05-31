import { HtmlPath } from '@geislabs/html'
import { Resource } from '@geislabs/geis-resource'
import { Castable, MaybeType } from '@geislabs/geis-type'
import { IntegerType, StringType } from '@geislabs/geis-core'
import { SessionStatus } from './sessionEnums'

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

export type AnySession = SuccessSession
//  | FailedSession
