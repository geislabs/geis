import { cast } from '@geis-studio/lib-type'
import { integer, string } from '@geis-studio/lib-core'
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
                title: cast(session['div.title'], string),
                description: cast(session['div.description'], string),
                summary: cast(session['div.summary'], string),
                likes: cast(session['div.likes'], integer),
            }))
        ).resolves.toStrictEqual({
            title: 'hello',
            description: 'description',
            summary: 'summary',
            likes: 15,
        })
    })
})
