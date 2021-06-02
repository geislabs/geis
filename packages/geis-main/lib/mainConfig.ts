import { Plugin } from '@geislabs/runtime'

export interface GeisConfig<TPlugin extends Plugin<any>> {
    plugins: Array<TPlugin>
}
