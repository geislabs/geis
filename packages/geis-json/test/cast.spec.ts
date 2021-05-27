import { Json } from '../lib'

describe('cast', () => {
    test('object', () => {
        const value = Json('{"five": 5}')
        expect(
            // @ts-expect-error
            value.toObject()
        ).toStrictEqual({ five: 5 })
    })
})
