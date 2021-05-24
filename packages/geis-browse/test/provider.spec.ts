import config, { mock } from '../lib'

const browse = config({
    adapter: mock({
        'http://google.com': `<html><h1 class="title">hello</h1></html>`,
    }),
})

describe('provider', () => {
    test('simple', async () => {
        await expect(
            browse('http://not-found.com', async (session) => {
                const title = session['h1.title'].toString()
                const description = session['h1.description'].toString()
                return { title, description }
            })
        ).rejects.toThrow(`location 'http://not-found.com' not found`)
    })
})
