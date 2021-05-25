import { PendingFile } from '@geislabs/geis-file'
import { Html } from '../lib'

describe('image', () => {
    test('simple', async () => {
        expect.hasAssertions()
        await Html(
            `<html><a class="link" href='/path'>my-link</a></html>`,
            '.link',
            {
                image: {
                    create: (selector) => {
                        expect(selector).toBe('body > a')
                        return { key: '', name: '' } as PendingFile
                    },
                },
            }
        ).toImage()
    })
})
