import { PartitionConfig } from './partitionConfig'
import { isPromise, isSavable } from './partitionGuards'
import { AnyPartition } from './partitionTypes'
import { GeneratorFn, PromiseFn } from './partitionValues'

export function partition<T extends AnyPartition>(
    value: Iterable<T>,
    callback: PromiseFn<T>,
    config?: Partial<PartitionConfig<T>>
): AsyncGenerator<T>
export function partition<T extends AnyPartition>(
    value: Iterable<T>,
    callback: GeneratorFn<T>,
    config?: Partial<PartitionConfig<T>>
): AsyncGenerator<T>
/**
 * Partition stuff
 * @param values
 * @param callback
 * @param param2
 */
export async function* partition<T extends AnyPartition>(
    values: Iterable<T>,
    callback: PromiseFn<T> | GeneratorFn<T>,
    { save, ...config }: Partial<PartitionConfig<T>> = {}
) {
    for (const value of values) {
        const callbackresult = callback(value)
        if (isPromise(callbackresult)) {
            yield await callbackresult
            continue
        }
        while (true) {
            let result = await callbackresult.next()
            if (isSavable(result) && save) {
                await save(result.value)
                break
            }
            if (result.done) {
                break
            }
            yield result.value
        }
    }
}
