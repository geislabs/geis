import { PendingFile } from '@geislabs/geis-file'
import { IntegerType, StringType } from '@geislabs/geis-core'
import { Castable, MaybeType } from '@geislabs/geis-type'

export interface HtmlPath
    extends Iterable<HtmlPath>,
        Castable<MaybeType<StringType> | MaybeType<IntegerType>> {
    toLink: () => Link | Error | null
    toFile: () => PendingFile | null
    parse: (selector: string) => HtmlPath
}

export interface Link {
    name: string
    href: string
}
