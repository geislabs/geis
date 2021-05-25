import { Castable, ErrorType } from '@geislabs/geis-type'
import { BooleanType, IntegerType, StringType } from '@geislabs/geis-core'
import { LinkType } from './link/linkTypes'
import { FileType } from './file/fileTypes'

export interface HtmlPath
    extends Iterable<HtmlPath>,
        Castable<
            | StringType
            | ErrorType<IntegerType>
            | ErrorType<BooleanType>
            | ErrorType<LinkType>
            | ErrorType<FileType>
        > {
    parse: (selector: string) => HtmlPath
}
