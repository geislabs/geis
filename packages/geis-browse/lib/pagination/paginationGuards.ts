import {
    AnyAction,
    BrowseActions,
    PaginateActions,
    TakeAction,
    WhileAction,
} from '../actions'

export function isWhile(action: AnyAction): action is WhileAction {
    return action.kind === 'while'
}

export function isTake(action: AnyAction): action is TakeAction {
    return action.kind === 'take'
}

export function isPagination(action: AnyAction): action is PaginateActions {
    return isWhile(action) || isTake(action)
}

export function isBrowse(action: AnyAction): action is BrowseActions {
    return !isPagination(action)
}
