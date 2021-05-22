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

export type AnyAction = WaitAction | ClickAction | GotoAction
