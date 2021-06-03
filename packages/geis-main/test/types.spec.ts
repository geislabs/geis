import { toArray } from 'ix/asynciterable'
import { run, Source, Worker, source, worker } from '../lib'

export const mySource = source(function* (context) {
    yield 1
    yield 2
    yield 3
})

export const myWorker = worker<number>(function* (value, index, context) {
    yield value * 2
})

describe('types', () => {
    test('source', async () => {
        await expect(toArray(run(mySource))).resolves.toStrictEqual([1, 2, 3])
    })
    test('worker', async () => {
        await expect(
            toArray(
                run([1, 2, 3], function* (value, index, context) {
                    yield value * 2
                })
            )
        ).resolves.toStrictEqual([2, 4, 6])
    })
})
