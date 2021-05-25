import { Html } from '../lib'

describe('string', () => {
    test('simple', () => {
        expect(Html(`<html>hello</html>`).toString()).toBe(`hello`)
    })
})
