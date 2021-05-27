import { PaginateActions } from '../actions'
import { isBrowse, isTake, isWhile } from './paginationGuards'
import { Paginator } from './paginationTypes'

export function buildPagination(actions: PaginateActions[]): Paginator {
    const [whileAction] = actions.filter(isWhile)
    const [takeAction] = actions.filter(isTake)
    const browseActions = actions.filter(isBrowse)
    return {
        page: 0,
        while: whileAction ? whileAction.selector : null,
        take: takeAction ? takeAction.count : null,
        actions: browseActions,
    }
}
