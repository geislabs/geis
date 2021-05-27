import { ProtocolAdapter } from './protocolAdapter'

export type Subprotocol = { [key: string]: any }

export type ProtocolInstance<T> = T

type GetValueType<TUrl extends string, TProto extends Subprotocol> =
    TUrl extends `${infer TData}://${infer _TRest}` ? TProto[TData] : never

export interface Protocol<
    TProto extends Subprotocol = Subprotocol,
    TInit = unknown,
    TGlobals extends object = object
> {
    <TUrl extends `${keyof TProto & string}://${string}`, TValue>(
        url: TUrl,
        callback: (type: GetValueType<TUrl, TProto>) => Promise<TValue>,
        globals?: Partial<TGlobals>
    ): Promise<TValue>
    // <TUrl extends `${keyof TProto & string}://${string}`, TValue>(
    //     url: TUrl,
    //     callback: (type: GetValueType<TUrl, TProto>) => Generator<TValue>,
    //     globals: TGlobals
    // ): AsyncGenerator<TValue>
    // <TUrl extends `${keyof TProto & string}://${string}`, TValue>(
    //     url: TUrl,
    //     config?: TInit[],
    //     callback?: (type: GetValueType<TUrl, TProto>) => Promise<TValue>,
    //     globals?: TGlobals
    // ): Promise<TValue>
    <TUrl extends `${keyof TProto & string}://${string}`>(
        url: TUrl,
        globals?: Partial<TGlobals>
    ): Promise<GetValueType<TUrl, TProto>>
    <TUrl extends `${keyof TProto & string}://${string}`>(
        url: TUrl,
        init: TInit[],
        globals?: Partial<TGlobals>
    ): Promise<GetValueType<TUrl, TProto>>
    // <TUrl extends `${keyof TProto & string}://${string}`, TValue>(
    //     url: TUrl,
    //     globals: TGlobals
    // ): Promise<GetValueType<TUrl, TProto>>
    // <TUrl extends `${keyof TProto & string}://${string}`, TValue>(
    //     url: TUrl,
    //     init: TInit[],
    //     globals?: TGlobals
    // ): Promise<TValue>
    // <TUrl extends `${keyof TProto & string}://${string}`, TValue>(
    //     url: TUrl,
    //     callback: AsyncGenerator<TValue>,
    //     globals?: TGlobals
    // ): AsyncGenerator<TValue>
}

// interface FetchResp<T> {}
// const fetch = {} as Protocol<
//     { html: FetchResp<string>; json: FetchResp<object> },
//     any,
//     any
// >

// const promise1 = fetch('json://google.com')
// const promise2 = fetch('json://google.com', async (resp) => resp)
