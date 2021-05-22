import { Disposable } from './resourceTypes'

export function isDisposable(value: any): value is Disposable {
    return typeof (value as Disposable).dispose === 'function'
}
