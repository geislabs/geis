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
    browse('https://github.com/geislabs/geis', async (home) => ({
        author: cast(home['span.author'], String),
        author: cast(home['span.author'], String),
        author: cast(home['span.author'], String),
        author: cast(home['span.author'], String),
        details: map(home['span.author'], (path) => ({
            author: cast(path['span.author'], String),
            author: cast(path['span.author'], String),
            author: cast(path['span.author'], String),
            author: cast(path['span.author'], String),
        })),
    }))
).then(console.log)
