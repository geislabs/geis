#!/usr/bin/env node

/**
 * @fileOverview
 * This sample code illustrates how to scrape the results of a webpage
 */

const { config } = require('..') // const config = require('@geislabs/geis')
const geis = config()

async function run() {
    const source1 = geis.run(async function* ({ http }) {
        const response = await http.request({
            url: 'https://github.com/geislabs/geis',
        })
        yield {
            name: response.body['name'],
            name: response.body['name'],
            name: response.body['name'],
            name: response.body['name'],
            name: response.body['name'],
        }
    })
    for await (const value of source1) {
        console.log(value)
    }
}

run()
