#!/usr/bin/env node

/**
 * @fileOverview
 * This sample code illustrates how to scrape the results of a webpage
 */

const { default: config } = require('../') // const config = require('@geislabs/geis')
const { PuppeteerAdapter } = require('../packages/geis-puppeteer')

const { browse, cast, apply, string, integer } = config({
    adapter: new PuppeteerAdapter(),
})

apply(
    browse('https://github.com/geislabs/geis', (session) => ({
        author: cast(session['span.author'], string),
        author: cast(session['span.author'], string),
        author: cast(session['span.author'], string),
        author: cast(session['span.author'], string),
        stars: cast(
            session['octicon octicon-repo-star > span.text-bold'],
            integer
        ),
        forks: cast(
            session['octicon octicon-repo-forked > span.text-bold'],
            integer
        ),
    }))
).then(console.log)
