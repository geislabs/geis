import { AnyAction } from '../actions'
import { AnySession } from './sessionTypes'

export interface CreateSessionAttrs {
    url: string
    actions: AnyAction[]
}

export interface ReuseSessionAttrs {
    session: AnySession
    actions: AnyAction[]
}

export type AnySessionAttrs = CreateSessionAttrs | ReuseSessionAttrs
