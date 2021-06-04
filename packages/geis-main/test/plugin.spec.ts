import { proxy } from '@geislabs/http-proxy'
import { toArray } from 'ix/asynciterable'
import { config } from '../lib'

describe('plugin', () => {
    test('simple', async () => {
        const { run } = config({
            plugins: [
                {
                    plugin: proxy,
                    options: {
                        mapping: {
                            'google.com': 'localhost:4000',
                        },
                    },
                },
            ],
        })
        await expect(
            toArray(
                run(({ http }) => http.request({ url: 'https://google.com' }))
            )
        ).rejects.toThrow(
            /request to https:\/\/localhost:4000\/ failed, reason: connect ECONNREFUSED/
        )
    })
})
