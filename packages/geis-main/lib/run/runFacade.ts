import { Plugin } from '@geislabs/runtime-plugin'
import {
    AnyCreateWorkerAttrs,
    config as createRunner,
    IExecutor,
} from '@geislabs/runner'

const symbol = Symbol()
export const Geis = { plugin: symbol }

export interface Pluginable {
    [symbol]: Plugin<any>
}

function isPlugin(value: any): value is Pluginable {
    return typeof value[symbol] === 'function'
}

// function Interval<T>(source: T, durationMs: number) {
//     return {
//         [Geis.plugin]: () => ({
//             name: 'interval',
//             depends: [],
//             register({}) {
//                 return async function* () {
//                     for (const value of [1, 2, 3]) {
//                         yield [value, { timestamp: new Date() }]
//                     }
//                 }
//             },
//         }),
//     }
// }

// async function* run<T>(
//     value: T,
//     callback: AnyCreateWorkerAttrs<any, any, any>
// ) {
//     const runner = createRunner({})
//     if (isPlugin(value)) {
//         const myplugin = value[symbol]
//         const source = myplugin.register({} as any)
//         if (isGenerator(source)) {
//             for (const [value, exports] of source) {
//                 yield* runner.run(function* (context) {
//                     yield* callback(value, { ...context, ...exports })
//                 })
//             }
//         } else {
//             yield* runner.run(function* (context) {
//                 yield* callback(value, { ...context, ...exports })
//             })
//         }
//     } else {
//         yield* runner.run(value, callback)
//     }
// }
