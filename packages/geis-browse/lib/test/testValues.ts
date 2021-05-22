import { AnyAction } from '../actions'

export interface ContentMap {
    [url: string]: AnyPageContent
}

export type PageContent = string
export type PageContentReducer = (
    state: string | undefined,
    action: AnyAction
) => string
export type AnyPageContent = PageContent | PageContentReducer
