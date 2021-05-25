import { create as createFile, FileAdapter } from '@geislabs/geis-file'
import { HtmlPath } from '../htmlTypes'

export function toFile(adapter: FileAdapter, path: HtmlPath) {
    const link = path.toLink()
    if (link instanceof Error || link === null) {
        return link
    }
    const pending = createFile(adapter, {
        filename: link.name,
        downloadUrl: link.href,
    })
    return pending
}
