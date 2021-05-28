import { JsonSelection } from '../jsonConfig'

export function parseString(value: JsonSelection): string {
    return value.map((value) => JSON.stringify(value)).join('')
}
