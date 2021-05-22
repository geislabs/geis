import { CustomType } from '@geislabs/lib-type'
import * as z from 'zod'

export interface StringType extends CustomType<'string', z.ZodString> {}
export interface IntegerType extends CustomType<'integer', z.ZodNumber> {}
