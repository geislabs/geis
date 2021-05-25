#!/usr/bin/env node

/**
 * @fileOverview
 * This sample code illustrates how to scrape the results of a webpage
 */

const path = require('path')
const { default: config } = require('..') // const config = require('@geislabs/geis')
const { LocalFileAdapter } = require('../packages/geis-file')
const { puppeteer } = require('../packages/geis-puppeteer')

const { browse, apply, cast, Image, String } = config({
    adapter: puppeteer({
        file: new LocalFileAdapter({
            rootDir: path.resolve(__dirname, 'tmp'),
        }),
    }),
})

apply(
    browse('https://github.com/geislabs/geis', (session) => ({
        author: cast(session['span.author'], String),
        file: cast(session['#readme'], Image),
    }))
).then(console.log)
