export type PromiseFn<T> = (value: T) => Promise<T>
export type GeneratorFn<T> = (value: T) => AsyncGenerator<T>
