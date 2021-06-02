import { Runtime, Dependency, Plugin } from '@geislabs/runtime'
import { MainDependency } from '../../lib/mainTypes'

export class Browser implements Dependency<'browser'> {
    name = 'browser' as const
    events = {} as any
    constructor(config: any) {}
}

export interface PartitionConfig<TValue> {
    source: Iterable<TValue>
    provide?: <TRuntime>(runtime: TRuntime, value: TValue) => TRuntime | void
}

export class Partition<TRuntime extends Runtime<MainDependency>, TValue>
    implements Plugin<MainDependency>
{
    constructor(public config: PartitionConfig<TValue>) {}
    // @ts-expect-error
    register(runtime: TRuntime) {
        this.config.provide(runtime as any, {} as any)
    }
}
