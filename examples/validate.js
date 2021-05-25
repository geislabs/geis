#!/usr/bin/env node

/**
 * @fileOverview
 * This sample code illustrates how to scrape the results of a webpage
 */

const { default: config } = require('..') // const config = require('@geislabs/geis')
const { puppeteer } = require('../packages/geis-puppeteer')

const { browse, cast, min, max, String } = config({
    adapter: puppeteer(),
})

const author = String(min(25), max(100))
const value = browse('https://github.com/geislabs/geis', (session) => ({
    author: cast(session['span.author'], author),
}))

value.then(console.log).catch((error) => console.error(error.message))
