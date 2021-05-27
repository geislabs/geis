import { ResourceAdapter } from '@geislabs/geis-resource'
import { FileAdapter } from '@geislabs/geis-file'
import { AnySession } from './sessionTypes'
import { AnySessionAttrs } from './sessionAttrs'

export interface SessionAdapter
    extends ResourceAdapter<AnySessionAttrs, AnySession> {
    file?: FileAdapter
    click: (session: AnySession, selector: string) => Promise<AnySession>
}

export type SessionProvider = () => SessionAdapter
