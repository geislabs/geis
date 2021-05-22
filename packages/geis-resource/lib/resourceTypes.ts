export interface Disposable {
    dispose: () => Promise<void>
}

export interface Resource extends Disposable {}
