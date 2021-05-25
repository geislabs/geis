#!/usr/bin/env node

/**
 * @fileOverview
 * This sample code illustrates how to scrape the results of a webpage
 */

const { default: config } = require('..') // const config = require('@geislabs/geis')
const { puppeteer } = require('../packages/geis-puppeteer/dist')

const { browse, cast, apply, String, Integer } = config({
    adapter: puppeteer(),
})

apply(
    browse('https://github.com/geislabs/geis', (session) => {
        const stars = cast(session['invalid selector'], Integer)
        console.log('stars', stars)
    })
).then(console.log)
