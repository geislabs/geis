import fs from 'fs'

export interface Upload {
    filename: string
    stream: Promise<fs.WriteStream> | Buffer
}
