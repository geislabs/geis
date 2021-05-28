import { fetch } from '../lib'

describe('provider', () => {
    test('callback', async () => {
        await expect(
            fetch('json://google.com', async (response) => response, {
                adapter: async () => ({
                    body: JSON.stringify({ value: 10 }),
                }),
            })
        ).resolves.toMatchObject({
            data: {
                value: 10,
            },
        })
    })
    test('promise', async () => {
        await expect(
            fetch('json://google.com', {
                adapter: async () => ({ body: JSON.stringify({ value: 10 }) }),
            })
        ).resolves.toMatchObject({
            data: {
                value: 10,
            },
        })
    })
})
