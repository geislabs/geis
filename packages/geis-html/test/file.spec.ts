import { LocalFileAdapter } from '@geislabs/geis-file'
import path from 'path'
import fs from 'fs'
import rimraf from 'rimraf'
import { Html } from '../lib'
import { assert } from './support'

const inputpath = [
    'file://',
    path.resolve(__dirname, 'fixtures', 'testfile.json'),
].join('')
const rootDir = path.resolve(__dirname, 'tmp')

describe('file', () => {
    beforeEach(() => {
        fs.mkdirSync(rootDir)
    })

    afterEach(() => {
        rimraf.sync(rootDir)
    })

    test('simple', async () => {
        await expect(
            Html(
                `<html><a class="link" href=${inputpath}>my-link</a></html>`,
                '.link',
                {
                    file: new LocalFileAdapter({ rootDir }),
                }
            ).toFile()
        ).resolves.toStrictEqual({ name: 'my-link', key: 'my-link' })
    })

    test('side effect', async () => {
        await Html(
            `<html><a class="link" href=${inputpath}>my-link</a></html>`,
            '.link',
            {
                file: new LocalFileAdapter({ rootDir }),
            }
        ).toFile()
        assert.jsonFile(rootDir, 'my-link').toStrictEqual({
            five: 5,
        })
    })
})
