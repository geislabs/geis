import config, { mock } from '../lib'

const browse = config({
    adapter: mock({
        'http://google.com': `<html><h1 class="title">hello</h1></html>`,
    }),
})

describe('provider', () => {
    test('simple', async () => {
        await expect(
            browse('http://not-found.com', async (session) => {
                const title = session['h1.title'].toString()
                const description = session['h1.description'].toString()
                return { title, description }
            })
        ).resolves.toThrow(`location 'http://not-found.com' not found`)
    })
    // test('callback', async () => {
    //     function run() {
    //         return browse('http://google.com', (session) => {
    //             const title = session['.title'].toString()
    //             const description = session['.description'].toString()
    //             const categories = session['tr.category']
    //             for (const category of categories) {
    //                 const name = category['.name'].toString()
    //                 const likes = category['.likes'].toString()
    //                 const comments = category['.comments'].toString()
    //                 return { title, description, name, likes, comments }
    //             }
    //         })
    //     }
    // })
    // test('generator', async () => {
    //     function run() {
    //         return browse('http://google.com', function* (session) {
    //             const title = session['.title'].toString()
    //             const description = session['.description'].toString()
    //             const categories = session['tr.category']
    //             for (const category of categories) {
    //                 const name = category['.name'].toString()
    //                 const likes = category['.likes'].toString()
    //                 const comments = category['.comments'].toString()
    //                 yield { title, description, name, likes, comments }
    //             }
    //         })
    //     }
    // })
    // test('async generator', async () => {
    //     function run() {
    //         return browse('http://google.com', async function* (session) {
    //             const title = session['.title'].toString()
    //             const description = session['.description'].toString()
    //             const categories = session['tr.category']
    //             for (const category of categories) {
    //                 const name = category['.name'].toString()
    //                 const likes = category['.likes'].toString()
    //                 const comments = category['.comments'].toString()
    //                 yield { title, description, name, likes, comments }
    //             }
    //         })
    //     }
    // })
})
