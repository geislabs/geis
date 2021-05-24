import { Arg1, Arg2 } from './browseTypes'
import { SessionAdapter, SessionProvider, SuccessSession } from './sessions'

export function getActions<T>(arg1?: Arg1<T>, arg2?: Arg2<T>) {
    if (Array.isArray(arg1)) {
        return arg1
    }
    if (Array.isArray(arg2)) {
        return arg2
    }
    return []
}

export function getAdapter(
    adapterOrProvider: SessionAdapter | SessionProvider
) {
    return typeof adapterOrProvider === 'function'
        ? adapterOrProvider()
        : adapterOrProvider
}

export function invokeHandler<T>(
    session: SuccessSession,
    arg1?: Arg1<T>,
    arg2?: Arg2<T>
) {
    if (Array.isArray(arg1)) {
        return arg2!(session)
    }
    if (typeof arg1 === 'function') {
        return arg1(session)
    }
    throw new Error(`invalid arg configuration`)
}

export function isPromise<T>(
    value: Promise<T> | Generator<T> | AsyncGenerator<T>
): value is Promise<T> {
    return typeof (value as Promise<T>).then === 'function'
}

export function isAsyncGenerator<T>(
    value: Promise<T> | Generator<T> | AsyncGenerator<T>
): value is AsyncGenerator<T> {
    return (value as AsyncGenerator)[Symbol.asyncIterator] !== undefined
}

export function isGenerator(fn: any) {
    return fn.constructor.name === 'GeneratorFunction'
}
