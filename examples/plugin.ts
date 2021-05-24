export interface Config<TPlugins> {
    plugins: TPlugins
}

type Plugin = <TIn extends Context = Context>(context: TIn) => any

export interface Context {
    use: <T>(eventName: string, callback: () => T) => T
}

function config<P1 extends Plugin>(
    config: Config<[P1]>
): Context & ReturnType<P1>
function config<P1 extends Plugin, P2 extends Plugin>(
    config: Config<[P1, P2]>
): Context & ReturnType<P1> & ReturnType<P2>
function config<P1 extends Plugin, P2 extends Plugin, P3 extends Plugin>(
    config: Config<[P1, P2, P3]>
): Context & ReturnType<P1> & ReturnType<P2> & ReturnType<P3>
function config<
    P1 extends Plugin,
    P2 extends Plugin,
    P3 extends Plugin,
    P4 extends Plugin
>(
    config: Config<[P1, P2, P3, P4]>
): Context & ReturnType<P1> & ReturnType<P2> & ReturnType<P3> & ReturnType<P4>
function config<
    P1 extends Plugin,
    P2 extends Plugin,
    P3 extends Plugin,
    P4 extends Plugin,
    P5 extends Plugin
>(
    config: Config<[P1, P2, P3, P4, P5]>
): Context &
    ReturnType<P1> &
    ReturnType<P2> &
    ReturnType<P3> &
    ReturnType<P4> &
    ReturnType<P5>
function config(config: Config<any>) {
    return
}

function browse() {
    return function (context: Context) {
        return {
            /**
             * Browse
             * @returns
             */
            browse: async () => ({}),
        }
    }
}

function fetch() {
    return function (context: Context) {
        return {
            /**
             * Fetch
             * @returns
             */
            fetch: async () => ({}),
        }
    }
}

function pooling(config: { concurrency?: number } = {}) {
    return function (context: Context) {
        const pool = {} as any
        context.use('resource.create', pool.acquire)
        context.use('resource.destroy', pool.release)
        return {}
    }
}

function logger(config: { level?: string } = {}) {
    return function (context: Context) {
        return { log: (value: string) => undefined }
    }
}

function metered(config: { level?: string } = {}) {
    return function (context: Context) {
        return { report: () => ({ count: 0, bytes: 0 }) }
    }
}

const value = config({
    plugins: [
        pooling({ concurrency: 5 }),
        browse(),
        fetch(),
        logger({}),
        metered({}),
    ],
})

value.report()
value.log('')
