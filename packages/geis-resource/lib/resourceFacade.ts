import { Disposable } from './resourceTypes'

// @ts-expect-error
export function pipe<T1 extends Disposable, T>(
    provider1: Promise<T1>,
    callback: (res1: T1) => AsyncGenerator<T>
): Promise<T>
export function pipe<T1 extends Disposable, T2 extends Disposable, T>(
    provider1: Promise<T1>,
    provider2: Promise<T2>,
    callback: (res1: T1, res2: T2) => AsyncGenerator<T>
): Promise<T>
export function pipe<
    T1 extends Disposable,
    T2 extends Disposable,
    T3 extends Disposable,
    T
>(
    provider1: Promise<T1>,
    provider2: Promise<T2>,
    provider3: Promise<T3>,
    callback: (res1: T1, res2: T2, res3: T3) => AsyncGenerator<T>
): Promise<T>
export async function pipe<
    T1 extends Disposable,
    T2 extends Disposable,
    T3 extends Disposable,
    T
>(
    provider1: Promise<T1>,
    provider2: Promise<T2>,
    provider3: Promise<T3>,
    callback: (res1: T1, res2: T2, res3: T3) => AsyncGenerator<T> | Promise<T>
) {
    const [instance1, instance2, instance3] = await Promise.all([
        provider1,
        provider2,
        provider3,
    ])
    try {
        const result = await callback(instance1, instance2, instance3)
        return result
    } finally {
        await Promise.all([
            instance1.dispose(),
            instance2.dispose(),
            instance3.dispose(),
        ])
    }
}
