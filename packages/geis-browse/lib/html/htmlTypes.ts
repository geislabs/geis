import { PendingFile } from '@geis-studio/lib-file'
import { IntegerType, StringType } from '@geis-studio/lib-core'
import { Castable, MaybeType } from '@geis-studio/lib-type'

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
