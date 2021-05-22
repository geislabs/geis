import browseconfig, { BrowseProviderConfig } from '@geis-studio/lib-browse'
import { cast, apply } from '@geis-studio/lib-type'
import { string, integer } from '@geis-studio/lib-core'

/**
 * Do stuff
 * @param config
 * @returns
 */
export function config(config: BrowseProviderConfig = {}) {
    return { browse: browseconfig(config), cast, apply, string, integer }
}
