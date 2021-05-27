import { BrowseActions } from '../actions'

export interface Paginator {
    while: string | null
    take: number | null
    actions: BrowseActions[]
}
