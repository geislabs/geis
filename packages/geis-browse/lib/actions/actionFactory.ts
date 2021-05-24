import { ClickAction, GotoAction, WaitAction } from './actionTypes'

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
