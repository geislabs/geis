import path from 'path'
import fs from 'fs'

export function jsonFile(rootDir: string, filename: string) {
    const filepath = path.resolve(rootDir, filename)
    const filecontent = fs.readFileSync(filepath, 'utf-8')
    const json = JSON.parse(filecontent)
    return {
        toStrictEqual(expected: object) {
            expect(json).toStrictEqual(expected)
        },
    }
}
