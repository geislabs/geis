import { BodyInit } from 'node-fetch'
import { AnyConfig } from '../config'
import { Serdes } from '../serdes'
import { CreateRequestAttrs } from './requestAttrs'
import { FetchRequest } from './requestTypes'

export function buildRequest<T>(
    serdes: Serdes<T>,
    configs: AnyConfig<T>[],
    attrs: CreateRequestAttrs
): FetchRequest<T> {
    return {
        url: attrs.url,
        method: 'get',
        headers: configs.reduce(
            (acc, config) =>
                config.kind === 'header'
                    ? { ...acc, [config.name]: config.value }
                    : acc,
            {}
        ),
        body: configs.reduce<BodyInit>(
            (acc, config) =>
                config.kind === 'body' ? serdes.encode(config.value) : acc,
            ''
        ),
        serdes,
    }
}
