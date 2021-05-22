import browseconfig, { BrowseProviderConfig } from '@geislabs/lib-browse'
import { cast, apply } from '@geislabs/lib-type'
import { string, integer } from '@geislabs/lib-core'

/**
 * Do stuff
 * @param config
 * @returns
 */
export function config(config: BrowseProviderConfig = {}) {
    return { browse: browseconfig(config), cast, apply, string, integer }
}
