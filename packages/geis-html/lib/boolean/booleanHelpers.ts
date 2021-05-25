import { Boolean } from '@geislabs/geis-core'
import { Cheerio, Node } from 'cheerio'

export function toBoolean(node: Cheerio<Node>): boolean | Error | null {
    if (node.length === 0) {
        return null
    }
    const text = node.text().trim().toLowerCase()
    const value = { true: true, false: false }[text] ?? text
    const parsed = Boolean().schema.safeParse(value)
    return parsed.success ? parsed.data : parsed.error
}
