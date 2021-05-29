import { JsonSelection } from '../jsonConfig'

export function parseString([value]: JsonSelection): string | null {
    if (value === undefined) {
        return null
    }
    if (typeof value === 'object') {
        return JSON.stringify(value)
    }
    return String(value)
}
