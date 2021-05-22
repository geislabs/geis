import config, { mock } from '../lib'

const browse = config({
    adapter: mock({
        'http://google.com': `<html>
            <p>hello</p>
            <ul>
                <li>item 1</li>
                <li>item 2</li>
                <li>item 3</li>
            </ul>
        </html>`,
    }),
})

describe('iterate', () => {
    test('single', async () => {
        await expect(
            browse('http://google.com', (session) => ({
                items: [...session['p']].map((path) => path.toString()),
            }))
        ).resolves.toStrictEqual({
            items: ['hello'],
        })
    })
    test('multiple', async () => {
        await expect(
            browse('http://google.com', (session) => ({
                items: [...session['ul > li']].map((path) => path.toString()),
            }))
        ).resolves.toStrictEqual({
            items: ['item 1', 'item 2', 'item 3'],
        })
    })
})
