import { Html } from '../lib'

describe('proxy', () => {
    test('simple', () => {
        expect(Html(`<html><div>hello</div></html>`)['div'].toString()).toBe(
            `hello`
        )
    })
})
