import { Integer } from '@geislabs/geis-core'
import { Cheerio, Node } from 'cheerio'

export function toInteger(node: Cheerio<Node>): number | Error | null {
    if (node.length === 0) {
        return null
    }
    const value = node.text()
    const number = Number(value)
    const parsed = Integer().schema.safeParse(number)
    return parsed.success ? parsed.data : parsed.error
}
