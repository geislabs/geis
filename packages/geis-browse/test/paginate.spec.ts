import { toArray } from 'ix/asynciterable'
import config, { BrowseType, mock } from '../lib'

describe('paginate', () => {
    let browse: BrowseType
    let page = 0

    beforeEach(() => {
        page = 0
        browse = config({
            adapter: mock({
                'http://google.com': (
                    state = `<html>
                        <ul>
                            <li>1</li>
                        </ul>
                        <button id="load-more">more</button> 
                    </html>`,
                    action
                ) => {
                    if (action.kind !== 'click') {
                        return state
                    }
                    switch (page) {
                        case 1: {
                            return `<html>
                                <ul>
                                    <li>1</li>
                                </ul>
                                <button id="load-more">more</button> 
                            </html>`
                        }
                        case 2: {
                            return `<html>
                                <ul>
                                    <li>1</li>
                                    <li>2</li>
                                </ul>
                                <button id="load-more">more</button> 
                            </html>`
                        }
                        default: {
                            return `<html>
                                <ul>
                                    <li>1</li>
                                    <li>2</li>
                                    <li>3</li>
                                </ul>
                            </html>`
                        }
                    }
                },
            }),
        })
    })

    test('simple', async () => {
        await expect(
            toArray(
                // @ts-expect-error
                browse(
                    'http://google.com',
                    [
                        browse.wait(1000),
                        browse.paginate(
                            browse.while('button#load-more *= stuff'),
                            browse.click('button#load-more'),
                            browse.take(10)
                        ),
                    ],
                    function* (session) {
                        page += 1
                        for (const value of session['ul > li']) {
                            yield value.toInteger()
                        }
                    }
                )
            )
        ).resolves.toStrictEqual([1, 2, 3])
    })

    test.skip('simple', async () => {
        await expect(
            toArray(
                // @ts-expect-error
                browse('http://google.com', async function* (session) {
                    const pages = browse.paginate(session, [
                        browse.while('button#load-more *= stuff'),
                        browse.click('button#load-more'),
                    ])
                    // @ts-expect-error
                    for await (const page of pages) {
                        for (const value of page['ul > li']) {
                            yield value.toInteger()
                        }
                    }
                })
            )
        ).resolves.toStrictEqual([1, 2, 3])
    })

    test.skip('simple', async () => {
        const session = browse('http://google.com', [
            browse.click('button#load-more'),
            browse.click('button#load-more'),
        ])
        const pages = browse.paginate(session, [
            browse.while('button#load-more *= stuff'),
            browse.click('button#load-more'),
        ])
        for await (const page of pages) {
            for (const value of page['ul > li']) {
                value.toInteger()
            }
        }
    })
})
