import { URL } from 'url'

export function buildUrl(url: string) {
    const resolved = url.replace(/^(\w)+:\/\//, 'https://')
    return new URL(resolved)
}
