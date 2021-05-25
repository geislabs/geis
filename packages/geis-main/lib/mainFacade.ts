import browseconfig, { BrowseProviderConfig } from '@geislabs/geis-browse'
import { cast, apply } from '@geislabs/geis-type'
import { String, Integer } from '@geislabs/geis-core'
import { Html, Link } from '@geislabs/geis-html'

/**
 * Do stuff
 * @param config
 * @returns
 */
export function config(config: BrowseProviderConfig = {}) {
    return {
        browse: browseconfig(config),
        cast,
        apply,
        String,
        Integer,
        Link,
        Html,
    }
}
