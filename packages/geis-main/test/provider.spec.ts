import { config } from '../lib'
import { browser } from './support'

describe('provider', () => {
    test('simple', () => {
        expect(() =>
            config({
                dependencies: [browser()],
            })
        ).not.toThrow()
    })
})
