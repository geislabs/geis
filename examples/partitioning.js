#!/usr/bin/env node

/**
 * @fileOverview
 * This sample code illustrates how to scrape the results of a webpage
 */

const { default: config } = require('..') // const config = require('@geislabs/geis')
const { PuppeteerAdapter } = require('../packages/geis-puppeteer/dist')

const { partition, browse, cast, string } = config({
    adapter: new PuppeteerAdapter(),
})

const source = partition(['geis', 'geis', 'geis'], function* (repo) {
    yield browse(`https://github.com/geislabs/${repo}`, (session) => ({
        author: cast(session['span.author'], string),
        author: cast(session['span.author'], string),
        author: cast(session['span.author'], string),
        author: cast(session['span.author'], string),
        author: cast(session['span.author'], string),
    }))
})

async function run() {
    for await (const value of source) {
        console.log(value)
    }
}

run()
