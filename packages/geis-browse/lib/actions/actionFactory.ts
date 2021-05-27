import {
    AnyAction,
    ClickAction,
    GotoAction,
    PaginateAction,
    TakeAction,
    WaitAction,
    WhileAction,
} from './actionTypes'

export const wait = (amountMs: number): WaitAction => ({
    kind: 'wait',
    amountMs,
})

export const click = (selector: string): ClickAction => ({
    kind: 'click',
    selector,
})

export const goto = (path: string): GotoAction => ({
    kind: 'goto',
    path,
})

export const paginate = (
    ...actions: Exclude<AnyAction, PaginateAction>[]
): PaginateAction => ({
    kind: 'paginate',
    actions,
})

export const _while = (selector: string): WhileAction => ({
    kind: 'while',
    selector,
})

export const take = (count: number): TakeAction => ({
    kind: 'take',
    count,
})
