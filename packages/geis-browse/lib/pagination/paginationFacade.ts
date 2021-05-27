import util from 'util'
import { invoke, ResourceCallback } from '@geislabs/geis-resource'
import { AnySession, SessionAdapter } from '../sessions'
import { buildPagination } from '../pagination/paginationFactory'
import {
    AnyCallbackFn,
    AsyncGeneratorCallbackFn,
    GeneratorCallbackFn,
    PaginateAnyCallbackFn,
    PaginateAsyncGeneratorCallbackFn,
    PaginateGeneratorCallbackFn,
    PaginatePromiseCallbackFn,
    PromiseCallbackFn,
} from '../browseTypes'
import { AnyAction, BrowseActions, PaginateActions } from '../actions'
import { Paginator } from './paginationTypes'
import { isBrowse } from './paginationGuards'

export function performPagination<T>(
    adapter: SessionAdapter,
    url: string,
    actions: PaginateActions[],
    callback: PaginatePromiseCallbackFn<T>
): Promise<T>
export function performPagination<T>(
    adapter: SessionAdapter,
    url: string,
    actions: PaginateActions[],
    callback: PaginateGeneratorCallbackFn<T>
): AsyncGenerator<T>
export function performPagination<T>(
    adapter: SessionAdapter,
    url: string,
    actions: PaginateActions[],
    callback: PaginateAsyncGeneratorCallbackFn<T>
): AsyncGenerator<T>
export function performPagination<T>(
    adapter: SessionAdapter,
    url: string,
    actions: PaginateActions[],
    callback: PaginateAnyCallbackFn<T>
) {
    const paginator = buildPagination(actions)
    const browseactions = actions.filter(isBrowse)
    if (isGenerator(callback)) {
        return (async function* () {
            yield* invoke(
                adapter,
                { url, actions: [] },
                async function* (session) {
                    let page = 0
                    while (true) {
                        const performed = await doPerform(
                            adapter,
                            session,
                            browseactions
                        )
                        yield* callback(performed, { ...paginator, page })
                        const condition = await adapter.has(
                            session,
                            paginator.while!
                        )
                        page++
                        if (condition === false) {
                            break
                        }
                    }
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
                        browseactions
                    )
                    yield* callback(performed, paginator)
                }
            )
        })()
    }
    return new Promise(async (resolve, reject) => {
        return invoke(adapter, { url, actions: [] }, async function (session) {
            const performed = await doPerform(adapter, session, browseactions)
            const result = await callback(performed, paginator)
            return resolve(result)
        }).catch(reject)
    })
}

function doPerform<T>(
    adapter: SessionAdapter,
    session: AnySession,
    actions: BrowseActions[]
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
    callback: PaginateAnyCallbackFn<TOut>
): callback is PaginateAsyncGeneratorCallbackFn<TOut> {
    return callback.toString().includes('asyncGenerator')
}

function isGenerator<TOut>(
    callback: PaginateAnyCallbackFn<TOut>
): callback is PaginateGeneratorCallbackFn<TOut> {
    return util.types.isGeneratorFunction(callback)
}
