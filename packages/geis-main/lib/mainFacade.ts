import { plugin as http } from '@geislabs/http'
import { plugin as fetch } from '@geislabs/fetch-plugin'
import { config as createRunner, IExecutor } from '@geislabs/runner'
import { PluginObject } from '@geislabs/runtime'
import { GeisConfig } from './mainConfig'
import { BuiltinPlugin } from './mainTypes'

/**
 * Initialize the Geis client
 * @param config
 * @returns
 */
export function config<TPlugin extends PluginObject<any>>({
    plugins = [],
    ...config
}: Partial<GeisConfig<TPlugin>> = {}): IExecutor<BuiltinPlugin> {
    const runner = createRunner({
        plugins: [
            {
                // @ts-expect-error
                plugin: http,
                options: {},
            },
            {
                // @ts-expect-error
                plugin: fetch,
                config: {},
            },
            // @ts-expect-error
            ...plugins,
        ],
    })
    return runner
}

const { pipe, run, watch } = config()
export { pipe, run, watch }
