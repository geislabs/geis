#!/usr/bin/env node

/**
 * @fileOverview
 * This sample code illustrates how to scrape the results of a webpage
 */

const { default: config } = require('..') // const config = require('@geislabs/geis')
const { puppeteer } = require('../packages/geis-puppeteer/dist')

const { browse, cast, String, Integer } = config({
    adapter: puppeteer(),
})

async function run() {
    const source = browse(
        'https://github.com/geislabs/geis',
        function* (session) {
            yield {
                author: cast(session['span.author'], String),
                author: cast(session['span.author'], String),
                author: cast(session['span.author'], String),
                author: cast(session['span.author'], String),
                stars: cast(
                    session['octicon octicon-repo-star > span.text-bold'],
                    Integer
                ),
                forks: cast(
                    session['octicon octicon-repo-forked > span.text-bold'],
                    Integer
                ),
            }
        }
    )
    for await (const value of source) {
        console.log(value)
    }
}

run()
