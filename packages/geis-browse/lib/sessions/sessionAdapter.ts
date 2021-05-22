import { FileAdapter } from '@geislabs/lib-file'
import { AnyAction } from '../actions'
import { AnySession } from './sessionTypes'

export interface SessionAdapter {
    file?: FileAdapter
    findOne: (location: string, actions: AnyAction[]) => Promise<AnySession>
}

export type SessionProvider = () => Promise<SessionAdapter>
