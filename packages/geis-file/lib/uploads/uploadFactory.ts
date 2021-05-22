import { Download } from '../downloads'
import { FileAdapter } from '../fileAdapter'
import { AnyCreateFileAttrs } from '../fileAttrs'
import { ResolvedFile } from '../fileTypes'
import { Upload } from './uploadTypes'

export function upload(
    adapter: FileAdapter,
    download: Promise<Download>,
    attrs: AnyCreateFileAttrs
): Promise<ResolvedFile> {
    return adapter.upload({
        filename: attrs.filename,
        // @ts-expect-error
        stream: download,
    })
}
