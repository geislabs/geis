import { config } from '../lib'
import { browser, partition } from './support'

describe('provider', () => {
    test('simple', () => {
        expect(() =>
            config({
                plugins: [
                    {
                        plugin: partition({
                            source: [1, 2, 3],
                            provide: (runtime, value) => {
                                return runtime
                            },
                        }),
                    },
                ],
            })
        ).not.toThrow()
    })
})
