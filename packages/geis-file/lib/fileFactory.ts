import { AnyCreateFileAttrs } from './fileAttrs'
import { PendingFile, ResolvedFile } from './fileTypes'

export function pending(
    resolved: Promise<ResolvedFile>,
    attrs: AnyCreateFileAttrs
): PendingFile {
    return Object.assign(resolved, {
        name: attrs.filename,
        key: attrs.filename,
    })
}
