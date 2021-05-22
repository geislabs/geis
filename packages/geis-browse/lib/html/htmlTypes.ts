import { PendingFile } from '@geislabs/lib-file'
import { IntegerType, StringType } from '@geislabs/lib-core'
import { Castable, MaybeType } from '@geislabs/lib-type'

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
