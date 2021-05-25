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
    browse('https://github.com/geislabs/geis', (session) => ({
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
    }))
).then(console.log)
