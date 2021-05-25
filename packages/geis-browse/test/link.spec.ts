import config, { mock } from '../lib'

const browse = config({
    adapter: mock({
        'http://google.com': `<html><p>not a link</p><a href="http://google.com/about">about</a></html>`,
    }),
})

describe('links', () => {
    test('anchor', async () => {
        await expect(
            browse('http://google.com', (session) => ({
                link: session['a'].toLink(),
            }))
        ).resolves.toStrictEqual({
            link: {
                name: 'about',
                href: 'http://google.com/about',
            },
        })
    })
    test('invalid link', async () => {
        await expect(
            browse('http://google.com', (session) => ({
                link: session['p'].toLink(),
            }))
        ).resolves.toStrictEqual({
            link: new Error(`element is not a valid link`),
        })
    })
})
