import { FileAdapter } from './fileAdapter'
import { AnyCreateFileAttrs } from './fileAttrs'
import { FileService } from './fileService'

export class Files {
    #service: FileService
    create(attrs: AnyCreateFileAttrs) {
        return this.#service.create(attrs)
    }
}

export function create(adapter: FileAdapter, attrs: AnyCreateFileAttrs) {
    const service = new FileService(adapter)
    return service.create(attrs)
}
