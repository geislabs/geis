import { fetch } from '../lib'

describe('url', () => {
    test('simple', async () => {
        expect.hasAssertions()
        await fetch('json://google.com', {
            adapter: async (request) => {
                expect(request.url.toString()).toEqual('https://google.com/')
                return {
                    body: '{}',
                }
            },
        })
    })
})
