import { config } from '../lib'

describe('header', () => {
    test('simple', async () => {
        const fetch = config(async (request) => {
            expect(request.headers).toStrictEqual({
                'Content-Type': 'application/json',
            })
            return {
                body: JSON.stringify({ value: 10 }),
            }
        })
        expect.hasAssertions()
        await fetch('json://google.com', [
            fetch.header('Content-Type', 'application/json'),
        ])
    })
})
