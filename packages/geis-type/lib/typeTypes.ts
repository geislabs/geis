import * as z from 'zod'
import { DeepReplace } from './typeUtils'

export interface ValueMap {
    [key: string]: unknown | Promise<any> | Generator<any> | Error
}

export interface CustomType<
    TKind extends string = string,
    T extends z.ZodSchema<any> = z.ZodSchema<any>
> {
    kind: TKind
    schema: T
}
export type TypeConstructor<
    T extends CustomType<any> = CustomType<any>,
    TInner = T extends CustomType<any, infer U> ? U : never
> = (schema?: TInner) => T

export type MaybeType<T extends CustomType> = CustomType<
    T extends CustomType<infer U> ? U : never,
    T extends CustomType<any, infer U> ? z.ZodNullable<U> : never
>

export type Castable<T extends CustomType> = {
    [P in T['kind'] as `to${Capitalize<P>}`]: () => z.infer<
        Extract<T, { kind: P }>['schema']
    >
}

export type ApplyValues<T> = {
    [P in keyof T]: ApplyValue<T[P]>
}

export type ApplyValue<T> = T extends Promise<infer U>
    ? // Flatten promises
      U
    : T extends Generator<infer U>
    ? // Flatten generators
      U
    : T extends AsyncGenerator<infer U>
    ? // Flatten generators
      U
    : // Coalesce undefined to nulls and remove errors
      DeepReplace<Exclude<T, Error>, [undefined, null]>

export type RemoveErrors<T extends ValueMap> = {
    [P in keyof T]: Exclude<T[P], Error>
}

export type RemovePromises<T extends ValueMap> = {
    [P in keyof T]: Exclude<T[P], Promise<any>>
}
