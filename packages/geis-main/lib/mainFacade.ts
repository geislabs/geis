import { http } from '@geislabs/http'
import { config as createRunner, IExecutor } from '@geislabs/runner'
import { Plugin, PluginObject } from '@geislabs/runtime'
import { GeisConfig } from './mainConfig'
import { BuiltinPlugin } from './mainTypes'
import { fromFetch } from './protocols/protocolFactory'

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
                plugin: http(),
            },
            {
                // @ts-expect-error
                plugin: fromFetch(http()),
            },
            // @ts-expect-error
            ...plugins,
        ],
    })
    return runner
}

const { pipe, run, watch } = config()
export { pipe, run, watch }
