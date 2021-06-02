#!/usr/bin/env node

/**
 * @fileOverview
 * This sample code illustrates how to scrape the results of a webpage
 */

const { default: config } = require('..') // const config = require('@geislabs/geis')
const { puppeteer } = require('../packages/geis-puppeteer/dist')

const { run, watch } = config({
    plugins: [
        proxy({
            mapping: {
                'google.com': 'localhost:4000',
            },
        }),
    ],
})

const count = Count(0)

const source = run([1, 2, 3], function* (value, index, { browse }) {
    const home = browse('https://github.com/geislabs/geis')
    yield {
        value1: Promise.resolve(home),
        value2: Promise.resolve(home),
        value3: Promise.resolve(home),
    }
})

const source = run(function* ({ browse }) {
    for (const value of [1, 2, 3]) {
        const home = browse('https://github.com/geislabs/geis')
        yield {
            value1: Promise.resolve(home),
            value2: Promise.resolve(home),
            value3: Promise.resolve(home),
        }
    }
})
