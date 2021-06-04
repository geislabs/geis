import { Response, plugin as http } from '@geislabs/http'
import { toArray } from 'ix/asynciterable'
import { config } from '../lib'

const mockFn = async (url: string): Promise<Response> => ({
    status: 200,
    body: JSON.stringify({
        userId: 1,
        id: 1,
        title: 'delectus aut autem',
        completed: true,
    }),
})

describe('fetch', () => {
    test('simple', async () => {
        const { run } = config({
            plugins: [{ plugin: http, options: { fetchFn: mockFn } }],
        })
        await expect(
            toArray(
                run(async function* ({ fetch }) {
                    const { data } = await fetch('json://my-site.com')
                    yield {
                        userId: data['userId'].toInteger(),
                        id: data['id'].toInteger(),
                        title: data['title'].toString(),
                        completed: data['completed'].toBoolean(),
                    }
                })
            )
        ).resolves.toStrictEqual([
            {
                userId: 1,
                id: 1,
                title: 'delectus aut autem',
                completed: true,
            },
        ])
    })
})
