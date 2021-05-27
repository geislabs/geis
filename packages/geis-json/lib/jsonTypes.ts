import { Castable, ErrorType, MaybeType } from '@geislabs/geis-type'
import { BooleanType, IntegerType, StringType } from '@geislabs/geis-core'

export interface JsonPath
    extends Iterable<JsonPath>,
        Castable<
            | MaybeType<StringType>
            | ErrorType<IntegerType>
            | ErrorType<BooleanType>
        > {
    parse: (selector: string) => JsonPath
}
