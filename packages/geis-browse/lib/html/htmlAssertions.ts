import { FileAdapter } from '@geislabs/lib-file'

export function assertFilesSupported(
    adapter?: FileAdapter
): asserts adapter is FileAdapter {
    if (!adapter) {
        throw new Error(`file not available`)
    }
}