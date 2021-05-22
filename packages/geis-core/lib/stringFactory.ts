import { TypeConstructor } from '@geislabs/lib-type'
import * as z from 'zod'
import { IntegerType, StringType } from './stringTypes'

export const string: TypeConstructor<StringType> = (schema = z.string()) => ({
    kind: 'string',
    schema,
})

export const integer: TypeConstructor<IntegerType> = (schema = z.number()) => ({
    kind: 'integer',
    schema,
})
