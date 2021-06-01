import { proxy } from '@geislabs/http'
import { config } from '../lib'

describe('plugin', () => {
    test('simple', async () => {
        const geis = config({
            plugins: [
                proxy({
                    proxy: {
                        'google.com': 'localhost:4000',
                    },
                }),
            ],
        })
        await expect(
            geis.http.request({ url: 'https://google.com' }).then(console.log)
        ).rejects.toThrow(
            /request to https:\/\/localhost:4000\/ failed, reason: connect ECONNREFUSED/
        )
    })
})
