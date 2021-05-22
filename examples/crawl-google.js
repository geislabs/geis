#!/usr/bin/env node

/**
 * @fileOverview
 * This sample code illustrates how to scrape the results of a webpage
 */

const { default: config, mock } = require('../') // const config = require('@geislabs/geis')
const { browse, cast, apply, string, integer } = config({
    adapter: mock({
        'http://google.com': `<html>
            <div class="title">hello</div>
            <div class="description">description</div>
            <div class="summary">summary</div>
            <div class="likes">15</div>
        </html> `,
    }),
})

apply(
    browse('http://google.com', (session) => ({
        title: cast(session['.title'], string),
        description: cast(session['.description'], string),
        summary: cast(session['.summary'], string),
        likes: cast(session['.likes'], integer),
    }))
).then(console.log)
