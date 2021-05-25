import { Castable, ErrorType, MaybeType } from '@geislabs/geis-type'
import { BooleanType, IntegerType, StringType } from '@geislabs/geis-core'
import { LinkType } from './link/linkTypes'
import { FileType } from './file/fileTypes'
import { Image } from './images/imageTypes'

export interface HtmlPath
    extends Iterable<HtmlPath>,
        Castable<
            | MaybeType<StringType>
            | ErrorType<IntegerType>
            | ErrorType<BooleanType>
            | ErrorType<LinkType>
            | ErrorType<FileType>
        > {
    parse: (selector: string) => HtmlPath
    toImage: () => Promise<Image>
}
