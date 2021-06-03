#!/usr/bin/env node

/**
 * @fileOverview
 * This sample code illustrates how to scrape the results of a webpage
 */

import { config } from '../packages/geis-main/dist/index' // const config = require('@geislabs/geis')
const geis = config()

async function run() {
    const source1 = geis.run(async function* ({ http }) {
        const { body } = await http.request({
            url: 'https://github.com/geislabs/geis',
        })
        yield {
            name: body['name'],
            // @ts-expect-error
            name: body['name'],
            // @ts-expect-error
            name: body['name'],
            // @ts-expect-error
            name: body['name'],
            // @ts-expect-error
            name: body['name'],
        }
    })
    for await (const value of source1) {
        console.log(value)
    }
}

run()
