#!/usr/bin/env node

/**
 * @fileOverview
 * This sample code illustrates how to scrape the results of a webpage
 */

const { default: config } = require('..') // const config = require('@geislabs/geis')
const { puppeteer } = require('../packages/geis-puppeteer/dist')

const { browse, cast, apply, String } = config({
    adapter: puppeteer(),
})

async function run() {
    const home = await browse('https://github.com/geislabs/geis')
    const details = await browse(home, [browse.goto('/details')])
    await apply({
        author: cast(home['span.author'], String),
        name: cast(details['span.name'], String),
    }).then(console.log)
    await home.dispose()
    await details.dispose()
}

run()
