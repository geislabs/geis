#!/usr/bin/env node

/**
 * @fileOverview
 * This sample code illustrates how to scrape the results of a webpage
 */

const { default: config } = require('..') // const config = require('@geislabs/geis')
const { puppeteer } = require('../packages/geis-puppeteer/dist')

const { browse, cast, apply, string } = config({
    adapter: puppeteer(),
})

apply(
    browse('https://github.com/geislabs/geis', (home) => ({
        value1: Promise.resolve(1),
        value2: Promise.resolve(2),
        value3: Promise.resolve(3),
    }))
).then(console.log)
