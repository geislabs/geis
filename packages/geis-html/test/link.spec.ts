import { Html } from '../lib'

describe('link', () => {
    test('simple', () => {
        expect(
            Html(
                `<html><a class="link" href='/path'>my-link</a></html>`,
                '.link'
            ).toLink()
        ).toStrictEqual({ name: 'my-link', href: '/path' })
    })
    test('null', () => {
        expect(
            Html(
                `<html><a class="" href='/path'>my-link</a></html>`,
                '.link'
            ).toLink()
        ).toBe(null)
    })
    test('error', () => {
        expect(
            Html(
                `<html><div class="link">my-link</div></html>`,
                '.link'
            ).toLink()
        ).toBeInstanceOf(Error)
    })
})
