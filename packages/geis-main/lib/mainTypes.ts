import { HttpPlugin } from '@geislabs/http'
import { FetchPlugin } from './fetch/fetchTypes'

export type BuiltinPlugin = HttpPlugin | FetchPlugin
