import { fetch } from '../lib'

describe('header', () => {
    test('simple', async () => {
        expect.hasAssertions()
        await fetch(
            'json://google.com',
            [fetch.header('Content-Type', 'application/json')],
            {
                adapter: async (url, init) => {
                    expect(init.headers).toStrictEqual({
                        'Content-Type': 'application/json',
                    })
                    return {
                        body: JSON.stringify({ value: 10 }),
                    }
                },
            }
        )
    })
})
