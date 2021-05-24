import { ResourceAdapter } from '@geislabs/geis-resource'
import { FileAdapter } from '@geislabs/geis-file'
import { AnySession } from './sessionTypes'
import { CreateSessionAttrs } from './sessionAttrs'

export interface SessionAdapter
    extends ResourceAdapter<CreateSessionAttrs, AnySession> {
    file?: FileAdapter
}

export type SessionProvider = () => Promise<SessionAdapter>
