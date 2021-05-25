#!/usr/bin/env node

/**
 * @fileOverview
 * This sample code illustrates how to scrape the results of a webpage
 */

const path = require('path')
const { default: config } = require('..') // const config = require('@geislabs/geis')
const { LocalFileAdapter } = require('../packages/geis-file')
const { puppeteer } = require('../packages/geis-puppeteer/dist')

const { browse, apply } = config({
    adapter: puppeteer({
        file: new LocalFileAdapter({
            rootDir: path.resolve(__dirname, 'tmp'),
        }),
    }),
})

apply(
    browse('https://github.com/geislabs/geis', async (session) => ({
        file: await session['#readme'].toImage(),
    }))
).then(console.log)
