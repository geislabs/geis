import browseconfig, { BrowseProviderConfig } from '@geislabs/geis-browse'
import partitionconfig, { PartitionConfig } from '@geislabs/geis-partition'
import { cast, apply } from '@geislabs/geis-type'
import { string, integer } from '@geislabs/geis-core'

/**
 * Do stuff
 * @param config
 * @returns
 */
export function config(
    config: BrowseProviderConfig & Partial<PartitionConfig> = {}
) {
    return {
        browse: browseconfig(config),
        partition: partitionconfig(config),
        cast,
        apply,
        string,
        integer,
    }
}
