import config, { mock } from '../lib'

const browse = config({
    adapter: mock({
        'http://google.com': `<html><h1 class="title">hello</h1></html>`,
    }),
})

describe('browse', () => {
    test('simple', async () => {
        await expect(
            browse('http://google.com', async (session) => {
                const title = session['h1.title'].toString()
                const description = session['h1.description'].toString()
                return { title, description }
            })
        ).resolves.toStrictEqual({
            title: 'hello',
            description: null,
        })
    })
})
