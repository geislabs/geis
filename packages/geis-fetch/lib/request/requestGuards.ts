import {
    AnyRequestAttrs,
    CreateRequestAttrs,
    StringRequestAttrs,
} from './requestAttrs'

export function isStringInit(
    attrs: AnyRequestAttrs
): attrs is StringRequestAttrs {
    return typeof attrs === 'string'
}

export function isObjectInit(
    attrs: AnyRequestAttrs
): attrs is CreateRequestAttrs {
    return !isStringInit(attrs)
}
