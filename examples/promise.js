#!/usr/bin/env node

/**
 * @fileOverview
 * This sample code illustrates how to scrape the results of a webpage
 */

const { config } = require('..') // const config = require('@geislabs/geis')

async function run() {
    const geis = config()
    const source1 = geis.run(
        [1, 2, 3, 4, 5],
        async function* (value, index, { http }) {
            const response = await http.request({
                url: 'https://github.com/geislabs/geis',
            })
            yield response
        }
    )
    for await (const value of source1) {
        console.log(value.status)
    }
}

run()
