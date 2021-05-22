export interface PendingFile extends Promise<ResolvedFile | Error> {
    name: string
    key: string
}

export interface ResolvedFile {
    name: string
    key: string
}

export interface FileUpload {
    path: string
}

export type AnyFile = PendingFile | ResolvedFile
