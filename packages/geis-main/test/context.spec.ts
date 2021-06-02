import { toArray } from 'ix/asynciterable'
import { config } from '../lib'

describe('context', () => {
    test('fetch', async () => {
        expect.hasAssertions()
        const { run } = config()
        await toArray(
            run((context) => {
                expect(context.http).toBeDefined()
                return []
            })
        )
    })
})
