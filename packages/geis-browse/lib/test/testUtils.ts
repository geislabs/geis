import { AnyAction } from '../actions'
import { isRaw } from './testGuards'
import { AnyPageContent } from './testValues'

export function applyActions(content: AnyPageContent, actions: AnyAction[]) {
    if (isRaw(content)) {
        return content
    }
    try {
        const initial = content(undefined, { kind: '@INIT' } as any)
        return actions.reduce((acc, action) => content(acc, action), initial)
    } catch (error) {
        console.error(`failed to initiailize browser state`)
        throw error
    }
}
