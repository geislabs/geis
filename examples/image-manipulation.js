#!/usr/bin/env node

/**
 * @fileOverview
 * This sample code illustrates how to scrape the results of a webpage
 */

const { default: config } = require('..') // const config = require('@geislabs/geis')
const { puppeteer } = require('../packages/geis-puppeteer/dist')

const { browse, cast, min, max, String } = config({
    adapter: puppeteer(),
})

const transform = cast(
    String,
    pad(5),
    grayscale(),
    rotate(95),
    session['#readme']
)
const value = browse('https://github.com/geislabs/geis', (session) => ({
    file: transform(session['#readme'], Image),
    file: transform(session['#readme'], Image),
    file: transform(session['#readme'], Image),
}))

value.then(console.log).catch((error) => console.error(error.message))
