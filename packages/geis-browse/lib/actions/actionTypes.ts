interface ActionBase<TKind extends string> {
    kind: TKind
}

export interface WaitAction extends ActionBase<'wait'> {
    amountMs: number
}

export interface ClickAction extends ActionBase<'click'> {
    selector: string
}

export interface GotoAction extends ActionBase<'goto'> {
    path: string
}

export interface PaginateAction extends ActionBase<'paginate'> {
    actions: Exclude<AnyAction, PaginateAction>[]
}

export interface WhileAction extends ActionBase<'while'> {
    selector: string
}

export interface TakeAction extends ActionBase<'take'> {
    count: number
}

export type PaginateActions = WhileAction | TakeAction | BrowseActions

export type BrowseActions = WaitAction | ClickAction | GotoAction
// | PaginateAction

export type AnyAction = BrowseActions | PaginateActions
