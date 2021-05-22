import { ClickAction, WaitAction } from './actionTypes'

export const wait = (amountMs: number): WaitAction => ({
    kind: 'wait',
    amountMs,
})

export const click = (selector: string): ClickAction => ({
    kind: 'click',
    selector,
})
