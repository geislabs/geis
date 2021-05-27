import { run } from '../lib'
import { TestProtocol } from './support/testFacade'

describe('sync', () => {
    test('simple', async () => {
        const protocol = new TestProtocol([1])
        await expect(
            run(
                protocol,
                {
                    stuff: true,
                },
                () => [1, 2, 3]
            )
        ).resolves.toStrictEqual([1, 2, 3])
    })
    test('type', async () => {
        expect.hasAssertions()
        const protocol = new TestProtocol([1])
        await run(
            protocol,
            {
                stuff: true,
            },
            (type) => expect(type).toStrictEqual({ stuff: true })
        )
    })
})
