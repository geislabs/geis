import { Http } from '@geislabs/http'
import { fromFetch } from './protocols/protocolFactory'

export type BuiltinPlugin = Http | ReturnType<typeof fromFetch>
