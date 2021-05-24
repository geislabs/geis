import { ResourceReference } from './resourceValues'

export interface Disposable {
    dispose: () => Promise<void>
}

export interface Resource extends ResourceReference {}
