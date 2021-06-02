import { toArray } from 'ix/asynciterable'
import { config } from '../lib'

describe('run', () => {
    test('simple', async () => {
        const { run } = config()
        await expect(
            toArray(
                run([1, 2, 3], function* (value) {
                    yield value * 2
                })
            )
        ).resolves.toStrictEqual([2, 4, 6])
    })
})
