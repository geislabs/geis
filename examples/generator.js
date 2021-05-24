#!/usr/bin/env node

/**
 * @fileOverview
 * This sample code illustrates how to scrape the results of a webpage
 */

const { default: config } = require('..') // const config = require('@geislabs/geis')
const { puppeteer } = require('../packages/geis-puppeteer/dist')

const { browse, cast, apply, string, integer } = config({
    adapter: puppeteer(),
})

async function run() {
    const source = browse(
        'https://github.com/geislabs/geis',
        function* (session) {
            yield {
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
            }
        }
    )
    for await (const value of source) {
        console.log(value)
    }
}

run()
