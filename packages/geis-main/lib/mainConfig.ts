import { PluginObject } from '@geislabs/runtime'

export interface GeisConfig<TPlugin extends PluginObject<any>> {
    plugins: Array<TPlugin>
}
