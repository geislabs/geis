import config, { mock } from '../lib'
import { toArray } from 'ix/asynciterable'

const browse = config({
    adapter: mock({
        'http://google.com': `<html><h1 class="title">hello</h1></html>`,
    }),
})

describe('browse', () => {
    test('simple', async () => {
        await expect(
            toArray(
                browse('http://google.com', async function* (session) {
                    yield 1
                    yield 2
                    yield 3
                })
            )
        ).resolves.toStrictEqual([1, 2, 3])
    })
})
