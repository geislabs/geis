import * as z from 'zod'
import { Validator } from './validatorTypes'

export function min(constraint: number) {
    return (schema: z.ZodString) => schema.min(constraint)
}

export function max(constraint: number) {
    return (schema: z.ZodString) => schema.max(constraint)
}

export type AnyValidator = ReturnType<typeof min> | ReturnType<typeof max>
