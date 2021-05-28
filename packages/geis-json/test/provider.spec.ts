import { Json } from '../lib'

describe('provider', () => {
    test('string', () => {
        const value = Json('{"value": 5}')
        expect(value.toObject()).toStrictEqual({
            value: 5,
        })
    })
    test('object', () => {
        const value = Json({ value: 5 })
        expect(value.toObject()).toStrictEqual({
            value: 5,
        })
    })
    test('path', () => {
        const value = Json('{"value": 5}', 'value')
        expect(value.toInteger()).toBe(5)
    })
})
