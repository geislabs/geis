import { config } from '../lib'

const fetch = config(async () => ({
    body: JSON.stringify({ value: 10 }),
}))

describe('proxy', () => {
    test('simple', async () => {
        const response = await fetch('json://google.com')
        const iterator = response.data[Symbol.iterator]?.()
        const { value: first } = iterator.next()
        expect(first.parse('value').toInteger()).toBe(10)
        expect(first['value'].toInteger()).toBe(10)
    })
})
