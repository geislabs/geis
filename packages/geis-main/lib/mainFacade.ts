import { http } from '@geislabs/http'
import { config as createRunner, IExecutor } from '@geislabs/runner'
import { Plugin } from '@geislabs/runtime'
import { GeisConfig } from './mainConfig'
import { BuiltinPlugin } from './mainTypes'
import { fromFetch } from './protocols/protocolFactory'

/**
 * Initialize the Geis client
 * @param config
 * @returns
 */
export function config<TPlugin extends Plugin<any>>({
    plugins = [],
    ...config
}: Partial<GeisConfig<TPlugin>> = {}): IExecutor<BuiltinPlugin> {
    const runner = createRunner({
        plugins: [http(), fromFetch(http()), ...plugins],
    })
    return runner
}

const { pipe, run, watch } = config()
export { pipe, run, watch }
