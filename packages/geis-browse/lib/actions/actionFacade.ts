import util from 'util'
import { invoke, ResourceCallback } from '@geislabs/geis-resource'
import { AnySession, SessionAdapter } from '../sessions'
import { AnyAction, BrowseActions } from './actionTypes'
import { buildPagination } from '../pagination/paginationFactory'
import {
    AnyCallbackFn,
    AsyncGeneratorCallbackFn,
    GeneratorCallbackFn,
    PromiseCallbackFn,
} from '../browseTypes'

export function perform<T>(
    adapter: SessionAdapter,
    url: string,
    actions: BrowseActions[],
    callback: PromiseCallbackFn<T>
): Promise<T>
export function perform<T>(
    adapter: SessionAdapter,
    url: string,
    actions: BrowseActions[],
    callback: GeneratorCallbackFn<T>
): AsyncGenerator<T>
export function perform<T>(
    adapter: SessionAdapter,
    url: string,
    actions: BrowseActions[],
    callback: AsyncGeneratorCallbackFn<T>
): AsyncGenerator<T>
export function perform<T>(
    adapter: SessionAdapter,
    url: string,
    actions: BrowseActions[],
    callback: AnyCallbackFn<T>
) {
    if (isGenerator(callback)) {
        return (async function* () {
            yield* invoke(
                adapter,
                { url, actions: [] },
                async function* (session) {
                    const performed = await doPerform(
                        adapter,
                        session,
                        actions,
                        callback
                    )
                    yield* callback(performed)
                }
            )
        })()
    }
    if (isAsyncGenerator(callback)) {
        return (async function* () {
            yield* invoke(
                adapter,
                { url, actions: [] },
                async function* (session) {
                    const performed = await doPerform(
                        adapter,
                        session,
                        actions,
                        callback
                    )
                    yield* callback(performed)
                }
            )
        })()
    }
    return new Promise(async (resolve, reject) => {
        return invoke(adapter, { url, actions: [] }, async function (session) {
            const performed = await doPerform(
                adapter,
                session,
                actions,
                callback
            )
            const result = await callback(performed)
            return resolve(result)
        }).catch(reject)
    })
}

function doPerform<T>(
    adapter: SessionAdapter,
    session: AnySession,
    actions: BrowseActions[],
    callback: AnyCallbackFn<T>
) {
    return actions.reduce(async (promiseAcc, action) => {
        let acc = await promiseAcc
        switch (action.kind) {
            case 'click': {
                return adapter.click(acc, action.selector)
            }
            case 'wait': {
                return acc
            }
            case 'goto': {
                return acc
            }
        }
    }, Promise.resolve(session))
}

function isAsyncGenerator<TOut>(
    callback: AnyCallbackFn<TOut>
): callback is (resource: AnySession) => AsyncGenerator<TOut> {
    return callback.toString().includes('asyncGenerator')
}

function isGenerator<TOut>(
    callback: AnyCallbackFn<TOut>
): callback is (resource: AnySession) => Generator<TOut> {
    return util.types.isGeneratorFunction(callback)
}
