import { Cheerio, Node } from 'cheerio'

export function toLink(node: Cheerio<Node>) {
    if (node.length === 0) {
        return null
    }
    const href = node.attr('href')
    if (!href) {
        return new Error(`element is not a valid link`)
    }
    return { name: node.text(), href }
}
