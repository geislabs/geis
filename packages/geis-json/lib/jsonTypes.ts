import { Castable, ErrorType, MaybeType } from '@geislabs/geis-type'
import { BooleanType, IntegerType, StringType } from '@geislabs/geis-core'
import { ImageType } from '@geislabs/geis-image'
import { LinkType } from './link/linkTypes'
import { FileType } from './file/fileTypes'

export interface JsonPath
    extends Iterable<JsonPath>,
        Castable<
            | MaybeType<StringType>
            | ErrorType<IntegerType>
            | ErrorType<BooleanType>
        > {
    parse: (selector: string) => JsonPath
}
