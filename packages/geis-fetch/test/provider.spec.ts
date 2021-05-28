import { config } from '../lib'

const fetch = config(async () => ({
    body: JSON.stringify({ value: 10 }),
}))

describe('provider', () => {
    test('callback', async () => {
        await expect(
            fetch('json://google.com', async (response) => response).then(
                (response) => response.data.toObject()
            )
        ).resolves.toMatchObject({
            value: 10,
        })
    })
    test('promise', async () => {
        await expect(
            fetch('json://google.com').then((response) =>
                response.data.toObject()
            )
        ).resolves.toMatchObject({
            value: 10,
        })
    })
})
