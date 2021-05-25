import { Html } from '../lib'

describe('boolean', () => {
    test('true', () => {
        expect(
            Html(
                `<html><div class="value">true</div></html>`,
                '.value'
            ).toBoolean()
        ).toBe(true)
    })
    test('false', () => {
        expect(
            Html(
                `<html><div class="value">false</div></html>`,
                '.value'
            ).toBoolean()
        ).toBe(false)
    })
    test('uppercase', () => {
        expect(
            Html(
                `<html><div class="value">TRUE</div></html>`,
                '.value'
            ).toBoolean()
        ).toBe(true)
    })
    test('trim', () => {
        expect(
            Html(
                `<html><div class="value"> true   </div></html>`,
                '.value'
            ).toBoolean()
        ).toBe(true)
    })
    test('null', () => {
        expect(
            Html(`<html><div class="">true</div></html>`, '.value').toBoolean()
        ).toBe(null)
    })
    test('error', () => {
        expect(
            Html(
                `<html><div class="value">5</div></html>`,
                '.value'
            ).toBoolean()
        ).toBeInstanceOf(Error)
    })
})
