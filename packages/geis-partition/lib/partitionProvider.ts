import { PartitionConfig } from './partitionConfig'
import * as internal from './partitionFacade'

export function config({ concurrency = 1 }: Partial<PartitionConfig> = {}) {
    return Object.assign(internal.partition, {})
}

export const partition = config()
