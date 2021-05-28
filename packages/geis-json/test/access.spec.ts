import { Integer } from '@geislabs/geis-core'
import { Json } from '../lib'

describe('access', () => {
    test('simple', () => {
        const data = JSON.stringify({ five: 5 })
        expect(Json(data).parse('five').toInteger()).toBe(5)
    })

    test('nested', () => {
        const data = JSON.stringify({ outer: { five: 5 } })
        expect(Json(data).parse('outer').parse('five').toInteger()).toBe(5)
        expect(Json(data).parse('outer.five').toInteger()).toBe(5)
    })

    test('array', () => {
        const data = JSON.stringify({ values: ['1', '2', '3'] })
        expect(Json(data).parse('values').toArray(Integer)).toStrictEqual([
            1, 2, 3,
        ])
    })

    test('array error', () => {
        const data = JSON.stringify({ values: ['1', 'not a number', '3'] })
        expect(Json(data).parse('values').toArray(Integer)).toBeInstanceOf(
            Error
        )
    })
})
