import { Integer } from '@geislabs/geis-core'
import { Json } from '../lib'

describe('cast', () => {
    test('string', () => {
        expect(Json('{"value": 5}').toString()).toBe('{"value":5}')
        expect(Json('{"value": "hello"}', 'value').toString()).toBe('hello')
    })

    test('integer', () => {
        const value = Json('{"value": 5}', 'value')
        expect(value.toInteger()).toBe(5)
    })

    test('boolean', () => {
        const value = Json('{"value": true}', 'value')
        expect(value.toBoolean()).toBe(true)
    })

    test('toArray', () => {
        const value = Json('{"value": ["1", "2", "3"]}', 'value')
        expect(value.toArray(Integer)).toStrictEqual([1, 2, 3])
    })

    test('object', () => {
        const value = Json('{"value": 5}')
        expect(value.toObject()).toStrictEqual({ value: 5 })
    })
})
