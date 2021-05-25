import { cast } from '@geislabs/geis-type'
import { Integer, String } from '@geislabs/geis-core'
import config, { mock } from '../lib'

const browse = config({
    adapter: mock({
        'http://google.com': `<html>
            <div class="title">hello</div>
            <div class="description">description</div>
            <div class="summary">summary</div>
            <div class="likes">15</div>
        </html>`,
    }),
})

describe('parse', () => {
    test('primitives', async () => {
        await expect(
            browse('http://google.com', (session) => ({
                title: cast(session['div.title'], String),
                description: cast(session['div.description'], String),
                summary: cast(session['div.summary'], String),
                likes: cast(session['div.likes'], Integer),
            }))
        ).resolves.toStrictEqual({
            title: 'hello',
            description: 'description',
            summary: 'summary',
            likes: 15,
        })
    })
})
