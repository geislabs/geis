import { Castable, ErrorType, MaybeType } from '@geislabs/geis-type'
import { BooleanType, IntegerType, StringType } from '@geislabs/geis-core'
import { ImageType } from '@geislabs/geis-image'
import { LinkType } from './link/linkTypes'
import { FileType } from './file/fileTypes'

export interface HtmlPath
    extends Iterable<HtmlPath>,
        Castable<
            | MaybeType<StringType>
            | ErrorType<IntegerType>
            | ErrorType<BooleanType>
            | ErrorType<LinkType>
            | ErrorType<FileType>
            | ErrorType<ImageType>
        > {
    parse: (selector: string) => HtmlPath
}
