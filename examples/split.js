#!/usr/bin/env node

/**
 * @fileOverview
 * This sample code illustrates how to scrape the results of a webpage
 */

const { default: config } = require('..') // const config = require('@geislabs/geis')
const { lowercase } = require('../packages/geis-html')
const { puppeteer } = require('../packages/geis-puppeteer/dist')

const { browse, cast, String, Array } = config({
    adapter: puppeteer(),
})

const value = browse('https://github.com/geislabs/geis', (session) => ({
    value: cast(session['#readme'], Array),
    value: cast(session['#readme'], Array),
    value: cast(session['#readme'], Array),
}))

value.then(console.log)
