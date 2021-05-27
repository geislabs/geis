import { Json } from '../lib'

describe('access', () => {
    test('simple', () => {
        expect(Json(JSON.stringify({ five: 5 }))['five'].toInteger()).toBe(5)
    })
    test('nested', () => {
        expect(
            Json(JSON.stringify({ outer: { five: 5 } }))['outer'][
                'five'
            ].toInteger()
        ).toBe(5)
    })
})
