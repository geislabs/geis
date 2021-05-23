import { toArray } from 'ix/asynciterable'
import { partition } from '../lib'

describe('partition', () => {
    test('simple', async () => {
        await expect(
            toArray(
                partition([1, 2, 3], async function* (value) {
                    yield value
                })
            )
        ).resolves.toStrictEqual([1, 2, 3])
    })
})
