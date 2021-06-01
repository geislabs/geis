import { Runtime, Dependency } from '@geislabs/runtime'
import { Http } from '@geislabs/http'

export type MainDependency = Http

export type GeisRuntime<TDep extends Dependency> = Runtime<
    TDep | MainDependency
>
