import { config } from '../lib'

describe('url', () => {
    test('simple', async () => {
        const fetch = config(async (request) => {
            expect(request.url.toString()).toEqual('https://google.com/')
            return {
                body: JSON.stringify({ value: 10 }),
            }
        })
        expect.hasAssertions()
        await fetch('json://google.com')
    })
})
