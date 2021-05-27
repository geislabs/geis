import { toArray } from 'ix/asynciterable'
import { run } from '../lib'
import { TestProtocol } from './support/testFacade'

describe('generator', () => {
    test('simple', async () => {
        const protocol = new TestProtocol([1])
        await expect(
            toArray(
                run(protocol, {}, function* () {
                    yield 1
                    yield 2
                    yield 3
                })
            )
        ).resolves.toStrictEqual([1, 2, 3])
    })
    test('async', async () => {
        const protocol = new TestProtocol([1])
        await expect(
            toArray(
                run(protocol, {}, async function* () {
                    yield 1
                    yield 2
                    yield 3
                })
            )
        ).resolves.toStrictEqual([1, 2, 3])
    })
})
