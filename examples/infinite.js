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

apply(
    browse('https://github.com/geislabs/geis', async function* (home) {
        while (true) {
            const scrolled = await browse(home, [
                browse.click('#more'),
                browse.wait('#button'),
            ])
            yield {
                author: cast(scrolled['span.author'], String),
                author: cast(scrolled['span.author'], String),
                author: cast(scrolled['span.author'], String),
                author: cast(scrolled['span.author'], String),
            }
        }
    })
).then(console.log)