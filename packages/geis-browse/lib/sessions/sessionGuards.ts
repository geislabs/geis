import { SessionStatus } from './sessionEnums'
import { AnySession, FailedSession } from './sessionTypes'

export function isFailed(session: AnySession): session is FailedSession {
    return session.status === SessionStatus.ERROR
}
