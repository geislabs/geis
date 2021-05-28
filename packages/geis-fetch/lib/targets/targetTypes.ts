import { Subprotocol } from '@geislabs/geis-protocol'

export interface HttpTarget<
    TUrl extends string,
    TProto extends Omit<Subprotocol<any, any>, 'name'>
> {
    url: TUrl
    parser: TProto
}
