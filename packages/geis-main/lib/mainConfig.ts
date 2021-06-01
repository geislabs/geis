import { Plugin, Dependency } from '@geislabs/runtime'
import { MainDependency } from './mainTypes'

export interface GeisConfig<TDeps extends Dependency> {
    dependencies: TDeps[]
    plugins: Plugin<TDeps | MainDependency>[]
}
