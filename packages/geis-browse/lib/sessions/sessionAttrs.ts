import { AnyAction } from '../actions'

export interface CreateSessionAttrs {
    url: string
    actions: AnyAction[]
}
