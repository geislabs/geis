import { Html } from '../lib'

describe('integer', () => {
    test('simple', () => {
        expect(
            Html(
                `<html><div class="value">5</div></html>`,
                '.value'
            ).toInteger()
        ).toBe(5)
    })
    test('null', () => {
        expect(
            Html(
                `<html><div class="">hello</div></html>`,
                '.not-found'
            ).toInteger()
        ).toBeNull()
    })
    test('error', () => {
        expect(
            Html(`<html><div class="value">hello</div></html>`).toInteger()
        ).toBeInstanceOf(Error)
    })
})
