import { run } from '../lib'
import { TestProtocol } from './support/testFacade'

describe('promise', () => {
    test('simple', async () => {
        const protocol = new TestProtocol([1])
        await expect(
            run(
                protocol,
                {
                    stuff: true,
                },
                async () => [1, 2, 3]
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
            async (type) => expect(type).toStrictEqual({ stuff: true })
        )
    })
})
