import { toArray } from 'ix/asynciterable'
import config, { BrowseType, mock } from '../lib'

describe('paginate', () => {
    let browse: BrowseType
    let iteration = 0

    beforeEach(() => {
        iteration = 0
        browse = config({
            adapter: mock({
                'http://google.com': (
                    state = `<html>
                        <ul></ul>
                        <button id="load-more">more</button> 
                    </html>`,
                    action
                ) => {
                    if (action.kind !== 'click') {
                        return state
                    }
                    switch (iteration) {
                        case 0: {
                            return `<html>
                                <ul>
                                    <li>1</li>
                                </ul>
                                <button id="load-more">more</button> 
                            </html>`
                        }
                        case 1: {
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
                browse.paginate(
                    'http://google.com',
                    [
                        browse.while('button#load-more'),
                        browse.click('button#load-more'),
                    ],
                    function* (session, paginator) {
                        iteration = paginator.page + 1
                        for (const value of session['ul > li']) {
                            yield value.toInteger()
                        }
                    }
                )
            )
        ).resolves.toStrictEqual([1, 1, 2, 1, 2, 3])
    })
})
