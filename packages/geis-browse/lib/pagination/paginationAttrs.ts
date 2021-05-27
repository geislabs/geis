import { BrowseActions } from '../actions'

export interface CreatePaginatorAttrs {
    while: string | null
    take: number | null
    actions: BrowseActions[]
}
