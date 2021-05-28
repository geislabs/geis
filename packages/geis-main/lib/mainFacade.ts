import browseconfig, { BrowseProviderConfig } from '@geislabs/geis-browse'
import { fetch, FetchConfig } from '@geislabs/geis-fetch'
import { cast, apply } from '@geislabs/geis-type'
import { String, Integer } from '@geislabs/geis-core'
import { Html, Link } from '@geislabs/geis-html'
import { Json } from '@geislabs/geis-json'
import { Image } from '@geislabs/geis-image'

/**
 * Do stuff
 * @param config
 * @returns
 */
export function config(
    config: BrowseProviderConfig & Partial<FetchConfig> = {}
) {
    return {
        browse: browseconfig(config),
        fetch,
        cast,
        apply,
        String,
        Integer,
        Link,
        Html,
        Image,
        Json,
        min: String.min,
        max: String.max,
    }
}
