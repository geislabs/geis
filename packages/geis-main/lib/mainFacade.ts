import { Dependency, runtime, config as createEvents } from '@geislabs/runtime'
import { http } from '@geislabs/http'
import { GeisConfig } from './mainConfig'
import { GeisRuntime } from './mainTypes'

/**
 * Initialize the Geis client
 * @param config
 * @returns
 */
export function config<TDep extends Dependency>({
    plugins = [],
    dependencies = [],
    ...config
}: Partial<GeisConfig<TDep>> = {}): GeisRuntime<TDep> {
    const events = createEvents()
    const instance = runtime({
        dependencies: [
            http({
                events,
            }),
            ...dependencies,
        ],
    })
    for (const plugin of plugins) {
        plugin.register(instance)
    }
    return instance
}
