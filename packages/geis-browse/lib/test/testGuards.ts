import { AnyPageContent, PageContent, PageContentReducer } from './testValues'

export function isReducer(
    content: AnyPageContent
): content is PageContentReducer {
    return typeof content === 'function'
}

export function isRaw(content: AnyPageContent): content is PageContent {
    return !isReducer(content)
}
