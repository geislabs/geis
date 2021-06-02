import { Browser, Partition, PartitionConfig } from './testFacade'

export function browser() {
    return new Browser({})
}

export function partition<TValue>({
    source = [],
    ...config
}: Partial<PartitionConfig<TValue>> = {}) {
    return new Partition({ source, ...config })
}
