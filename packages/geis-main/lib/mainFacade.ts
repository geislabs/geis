import { http } from '@geislabs/http'
import { config as createRunner, Executor } from '@geislabs/runner'
import { Plugin } from '@geislabs/runtime'
import { GeisConfig } from './mainConfig'
import { BuiltinPlugin } from './mainTypes'

/**
 * Initialize the Geis client
 * @param config
 * @returns
 */
export function config<TPlugin extends Plugin<any>>({
    plugins = [],
    ...config
}: Partial<GeisConfig<TPlugin>> = {}): Executor<BuiltinPlugin | TPlugin> {
    const runner = createRunner({ plugins: [...plugins, http()] })
    return runner
}
