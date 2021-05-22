import config, { mock } from '@geislabs/geis'

const { cast, apply, browse, integer, string } = config({
    adapter: mock({
        'http://google.com': `<html>
            <div class="title">hello</div>
            <div class="description">description</div>
            <div class="summary">summary</div>
            <div class="likes">15</div>
        </html>`,
    }),
})

describe('browse', () => {
    test('simple', async () => {
        await expect(
            apply(
                browse('http://google.com', (session) => ({
                    title: cast(session['.title'], string),
                    description: cast(session['.description'], string),
                    summary: cast(session['.summary'], string),
                    likes: cast(session['.likes'], integer),
                }))
            )
        ).resolves.toStrictEqual({
            title: 'hello',
            description: 'description',
            summary: 'summary',
            likes: 15,
        })
    })
})
