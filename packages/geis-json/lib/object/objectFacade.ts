import { JsonSelection } from '../jsonConfig'

export function parseObject(value: JsonSelection) {
    const [inner] = value
    if (inner === undefined) {
        return null
    }
    if (typeof value[0] !== 'object') {
        return Error('not an object')
    }
    return inner as object
}
