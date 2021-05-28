import { fetch } from '../lib'

describe('header', () => {
    test('simple', async () => {
        expect.hasAssertions()
        await fetch(
            'json://google.com',
            [fetch.header('Content-Type', 'application/json')],
            {
                adapter: async (request) => {
                    expect(request.headers).toStrictEqual({
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
