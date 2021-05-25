import { TypeConstructor } from '@geislabs/geis-type'
import * as z from 'zod'
import { IntegerType, StringType } from './stringTypes'

export const String: TypeConstructor<StringType> = (schema = z.string()) => ({
    kind: 'string',
    schema,
})

export const Integer: TypeConstructor<IntegerType> = (schema = z.number()) => ({
    kind: 'integer',
    schema,
})
