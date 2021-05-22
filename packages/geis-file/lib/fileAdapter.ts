import { ResolvedFile } from './fileTypes'
import { Upload } from './uploads/uploadTypes'

export interface FileAdapter {
    upload: (upload: Upload) => Promise<ResolvedFile>
}
