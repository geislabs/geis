#!/usr/bin/env node

/**
 * @fileOverview
 * This sample code illustrates how to scrape the results of a webpage
 */

const { default: config } = require('..') // const config = require('@geislabs/geis')
const { puppeteer } = require('../packages/geis-puppeteer/dist')

const { browse, cast, apply, Link } = config({
    adapter: puppeteer(),
})

apply(
    browse('https://github.com/geislabs/geis', (session) => ({
        file: cast(session['span.author > a.url'], Link),
    }))
).then(console.log)
