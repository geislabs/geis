import { Cheerio, Node } from 'cheerio'

export function toString(node: Cheerio<Node>): string | null {
    if (node.length === 0) {
        return null
    }
    const value = node.text().trim()
    return value
}
