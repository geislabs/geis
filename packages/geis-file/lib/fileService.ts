import { download } from './downloads'
import { upload } from './uploads'
import { FileAdapter } from './fileAdapter'
import { AnyCreateFileAttrs } from './fileAttrs'
import { pending } from './fileFactory'
import { PendingFile } from './fileTypes'

export class FileService {
    constructor(private adapter: FileAdapter) {}
    create(attrs: AnyCreateFileAttrs): PendingFile {
        const downloading = download(attrs)
        const uploading = upload(this.adapter, downloading, attrs)
        const file = pending(uploading, attrs)
        return file
    }
}
