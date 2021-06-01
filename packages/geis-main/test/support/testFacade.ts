import { Dependency } from '@geislabs/runtime'

export class Browser implements Dependency<'browser'> {
    name = 'browser' as const
    events = {} as any
    constructor(config: any) {}
}
