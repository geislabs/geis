import { Html } from '../lib'

describe('parse', () => {
    test('simple', () => {
        expect(
            Html(`<html><div class="value">hello</div></html>`)
                .parse('.value')
                .toString()
        ).toBe('hello')
    })

    test('constructor', () => {
        expect(
            Html(
                `<html><div class="value">hello</div></html>`,
                '.value'
            ).toString()
        ).toBe('hello')
    })

    test('nested', () => {
        expect(
            Html(
                `<html><div class="outer"><div class="inner">hello</div></div></html>`
            )
                .parse('.outer')
                .parse('.inner')
                .toString()
        ).toBe('hello')
    })

    test('scoping', () => {
        expect(
            [
                ...Html(
                    `<html>
                        <ul class="items">
                            <li><div class="value">1</div></li>
                            <li><div class="value">2</div></li>
                            <li><div class="value">3</div></li>
                            <li><div class="value">4</div></li>
                            <li><div class="value">5</div></li>
                        </ul>
                    </html>`
                )
                    .parse('ul.items')
                    .parse('.value'),
            ].map((item) => item.toInteger())
        ).toStrictEqual([1, 2, 3, 4, 5])
    })
})
