import { invoke, ResourceAdapter } from '../lib'
import { toArray } from 'ix/asynciterable'

const adapter: ResourceAdapter = {
    async create() {
        return {}
    },
    async destroy() {},
}

describe('promise', () => {
    test('simple', async () => {
        await expect(invoke(adapter, {}, () => 5)).resolves.toBe(5)
    })

    test('promise', async () => {
        await expect(invoke(adapter, {}, async () => 5)).resolves.toBe(5)
    })

    test('generator', async () => {
        await expect(
            toArray(
                invoke(adapter, {}, function* () {
                    yield 1
                    yield 2
                    yield 3
                })
            )
        ).resolves.toStrictEqual([1, 2, 3])
    })

    test('async generator', async () => {
        await expect(
            toArray(
                invoke(adapter, {}, async function* () {
                    yield 1
                    yield 2
                    yield 3
                })
            )
        ).resolves.toStrictEqual([1, 2, 3])
    })
})
