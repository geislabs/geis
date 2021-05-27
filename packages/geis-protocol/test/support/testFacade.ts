import { Protocol } from '../../lib'

export class TestProtocol<T> implements Protocol<T> {
    constructor(public value: T[] = []) {}

    async create(config) {
        return config
    }

    async destroy() {}
}
