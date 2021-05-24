import { ResourceAdapter } from '@geislabs/geis-resource'
import { FileAdapter } from '@geislabs/geis-file'
import { AnySession } from './sessionTypes'
import { AnySessionAttrs, CreateSessionAttrs } from './sessionAttrs'

export interface SessionAdapter
    extends ResourceAdapter<AnySessionAttrs, AnySession> {
    file?: FileAdapter
}

export type SessionProvider = () => SessionAdapter
