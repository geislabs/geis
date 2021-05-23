import { toArray } from 'ix/asynciterable'
import { partition } from '../lib'

describe('state', () => {
    test('simple', async () => {
        const state = new Map([
            [1, { id: 1, done: false }],
            [2, { id: 2, done: false }],
            [3, { id: 3, done: false }],
        ])
        await toArray(
            partition(
                state.values(),
                async function* (record) {
                    if (record.id === 2) {
                        return { ...record, done: true }
                    }
                },
                { save: async (record) => state.set(record.id, record) }
            )
        )
        expect([...state.values()]).toStrictEqual([
            { id: 1, done: false },
            { id: 2, done: true },
            { id: 3, done: false },
        ])
    })
})
