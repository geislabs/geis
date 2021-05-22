import https from 'https'
import fs from 'fs'
import { DownloadFileAttrs } from '../fileAttrs'
import { Download } from './downloadTypes'

export async function download(attrs: DownloadFileAttrs): Promise<Download> {
    return new Promise<Download>((resolve) => {
        const fileprefix = 'file://'
        if (attrs.downloadUrl.startsWith(fileprefix)) {
            const stream = fs.createReadStream(
                attrs.downloadUrl.replace(fileprefix, '')
            )
            return resolve(stream)
        }
        https.get(attrs.downloadUrl, (response) => {
            // @ts-expect-error
            resolve(response.pipe(fs.createWriteStream(attrs.filename)))
        })
    })
}
