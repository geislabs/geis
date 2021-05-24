import {
    AnySessionAttrs,
    CreateSessionAttrs,
    ReuseSessionAttrs,
} from './sessionAttrs'

export function isReused(attrs: AnySessionAttrs): attrs is ReuseSessionAttrs {
    return (attrs as ReuseSessionAttrs).session !== undefined
}

export function isFresh(attrs: AnySessionAttrs): attrs is CreateSessionAttrs {
    return (attrs as CreateSessionAttrs).url !== undefined
}
