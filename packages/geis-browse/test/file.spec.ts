import path from 'path'
import * as rimraf from 'rimraf'
import fs from 'fs'
import config, { mock } from '../lib'
import { assert } from './support'

const testpath = [
    'file://',
    path.resolve(__dirname, 'fixtures', 'testfile.json'),
].join('')

const rootDir = path.resolve(__dirname, 'tmp')
const filename = 'my-file.json'
const browse = config({
    adapter: mock(
        {
            'http://google.com': `<html><a href="${testpath}">${filename}</a></html>`,
        },
        { rootDir }
    ),
})

describe('file', () => {
    beforeEach(() => {
        fs.mkdirSync(rootDir)
    })

    afterEach(() => {
        rimraf.sync(rootDir)
    })

    test('return', async () => {
        await expect(
            browse('http://google.com', async (session) => {
                const file = await session['a'].toFile()
                return {
                    file,
                }
            })
        ).resolves.toStrictEqual({
            file: {
                name: filename,
                key: filename,
            },
        })
    })
    test('side effect', async () => {
        await browse('http://google.com', async (session) => {
            const file = await session['a'].toFile()
            return {
                file,
            }
        })
        assert.jsonFile(rootDir, filename).toStrictEqual({
            five: 5,
        })
    })
})
