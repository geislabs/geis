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

const Author = String(min(25), max(100))
const castAuthor = cast(lowercase, lowercase, lowercase)(Author)

const value = browse('https://github.com/geislabs/geis', (session) => ({
    author: cast(session['span.author'])(Author),
    author: cast(session['span.author'])(Author),
    author: cast(session['span.author'])(Author),
    author: cast(session['span.author'])(Author),
    author: cast(session['span.author'])(Author),
}))

value.then(console.log)
