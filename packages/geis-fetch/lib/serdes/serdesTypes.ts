export interface Serdes<T = any> {
    encode: (value: T) => string
    decode: (value: string) => T
}
