import type { PendingFile } from '@geislabs/geis-file'

export interface ImageAdapter {
    create: (selector: string) => PendingFile
}
