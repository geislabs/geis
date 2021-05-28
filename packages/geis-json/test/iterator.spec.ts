import { Json } from '../lib'

describe('iterator', () => {
    test('simple', () => {
        const value = [...Json('{"value": 5}', 'value')].map((path) =>
            path.toInteger()
        )
        expect(value).toStrictEqual([5])
    })
    test('array', () => {
        const value = [...Json('{"value": [1, 2, 3]}', 'value')]
        expect(value).toHaveLength(3)
    })
})
