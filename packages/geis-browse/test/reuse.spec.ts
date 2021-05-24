import config, { mock } from '../lib'

const browse = config({
    adapter: mock({
        'http://google.com': `<html><h1 class="title">home</h1></html>`,
        'http://google.com/about': `<html><h1 class="title">about</h1></html>`,
    }),
})

describe('reuse', () => {
    test('simple', async () => {
        await expect(
            browse('http://google.com', async (home) => ({
                title: home['h1.title'].toString(),
                details: await browse(
                    home,
                    [
                        browse.goto('/about'),
                        browse.goto('/about'),
                        browse.goto('/about'),
                    ],
                    (details) => ({
                        title: details['h1.title'].toString(),
                    })
                ),
            }))
        ).resolves.toStrictEqual({
            title: 'home',
            details: {
                title: 'about',
            },
        })
    })
})
