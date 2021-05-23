export interface PartitionConfig<T = any> {
    concurrency: number
    save?: (value: T) => Promise<unknown>
}
