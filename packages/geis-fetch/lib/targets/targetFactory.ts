import { ProtocolMap } from '@geislabs/geis-protocol'
import { HttpTarget } from './targetTypes'

export function buildTarget<
    TMap extends ProtocolMap<any>,
    TUrl extends TMap extends ProtocolMap<infer TProto>
        ? `${TProto['name'] & string}://${string}`
        : never
>(
    parsers: TMap,
    url: TUrl
): TUrl extends `${infer TType}://${infer TRest}`
    ? HttpTarget<TRest, TMap[TType]>
    : never {
    const [subprotocol, rest] = url.split('://')
    const parser = parsers[subprotocol]
    if (!subprotocol) {
        throw new Error(`parser '${subprotocol}' not ofund`)
    }
    // @ts-expect-error
    return { url: rest, parser }
}
