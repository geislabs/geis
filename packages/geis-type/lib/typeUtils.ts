/**
 * Recursive type transformation. Support scalar, object, array, and tuple as original type.
 * @example
 * DeepReplace<Original, [From, To] | [Date, string] | ...>
 */
export type DeepReplace<T, M extends [any, any]> = T extends M[0]
    ? Replacement<M, T>
    : {
          [P in keyof T]: T[P] extends M[0]
              ? Replacement<M, T[P]>
              : T[P] extends (infer R)[] // Is this a Tuple or array
              ? DeepReplace<R, M>[] // Replace the type of the tuple/array
              : T[P] extends object
              ? DeepReplace<T[P], M>
              : Extract<T[P], M[0]> extends M[0] // Is this a union with the searched for type?
              ? UnionReplacement<M, T[P]> // Replace the union
              : T[P]
      }

export type Replacement<M extends [any, any], T> = M extends any
    ? [T] extends [M[0]]
        ? M[1]
        : never
    : never

type UnionReplacement<M extends [any, any], T> =
    | DeepReplace<Extract<T, object>, M> // Replace all object types of the union
    | Exclude<T, M[0] | object> // Get all types that are not objects (handled above) or M[0] (handled below)
// | M[1]; // Direct Replacement of M[0]
