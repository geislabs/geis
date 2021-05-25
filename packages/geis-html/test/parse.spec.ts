import { Html } from '../lib'

describe('parse', () => {
    test('simple', () => {
        expect(
            Html(`<html><div class="value">hello</div></html>`, '.value')
                .parse('.value')
                .toString()
        ).toBe('hello')
    })
    test('nested', () => {
        expect(
            Html(
                `<html><div class="outer"><div class="inner">hello</div></div></html>`,
                '.value'
            )
                .parse('.outer')
                .parse('.inner')
                .toString()
        ).toBe('hello')
    })
})
