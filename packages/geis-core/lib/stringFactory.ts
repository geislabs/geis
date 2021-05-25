import { TypeConstructor } from '@geislabs/geis-type'
import * as z from 'zod'
import { BooleanType, IntegerType, StringType } from './stringTypes'

export const String: TypeConstructor<StringType> = (schema = z.string()) => ({
    kind: 'string',
    schema,
})

export const Integer: TypeConstructor<IntegerType> = (schema = z.number()) => ({
    kind: 'integer',
    schema,
})

export const Boolean: TypeConstructor<BooleanType> = (
    schema = z.boolean()
) => ({
    kind: 'boolean',
    schema,
})
