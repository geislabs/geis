import fs from 'fs'
import path from 'path'
import fsExtra from 'fs-extra'
import { FileAdapter } from '../fileAdapter'
import { ResolvedFile } from '../fileTypes'
import { Upload } from '../uploads/uploadTypes'
import { LocalFileConfig } from './localConfig'

export class LocalFileAdapter implements FileAdapter {
    constructor(public config: LocalFileConfig) {}
    async upload(upload: Upload) {
        const stream = await upload.stream
        const destination = path.resolve(this.config.rootDir, upload.filename)
        if (stream instanceof Buffer) {
            return new Promise<ResolvedFile>((resolve, reject) => {
                fsExtra.outputFile(destination, stream, (error) => {
                    if (error) {
                        return reject(error)
                    }
                    return resolve({
                        name: upload.filename,
                        key: upload.filename,
                    })
                })
            })
        }
        const file = fs.createWriteStream(destination, { flags: 'w' })
        return new Promise<ResolvedFile>((resolve, reject) =>
            stream
                .on('end', () => {
                    file.end()
                    resolve({ name: upload.filename, key: upload.filename })
                })
                .on('error', (err) => {
                    console.error('error', err)
                    file.destroy()
                    fs.unlink(destination, () => reject(err))
                })
                .pipe(file)
        )
    }
}
