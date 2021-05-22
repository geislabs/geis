import config, { mock } from '../lib'

const browse = config({
    adapter: mock({
        'http://google.com': (
            state = `<html><h1 class="title">not clicked</h1></html>`,
            action
        ) => {
            if (action.kind === 'click' && action.selector === '#button') {
                return `<html><h1 class="title">clicked</h1></html>`
            }
            return state
        },
    }),
})

describe('click', () => {
    test('no action', async () => {
        await expect(
            browse('http://google.com', [], (session) => ({
                title: session['h1.title'].toString(),
            }))
        ).resolves.toStrictEqual({
            title: 'not clicked',
        })
    })
    test('clicked', async () => {
        await expect(
            browse(
                'http://google.com',
                [browse.click('#button')],
                (session) => ({
                    title: session['h1.title'].toString(),
                })
            )
        ).resolves.toStrictEqual({
            title: 'clicked',
        })
    })
})
