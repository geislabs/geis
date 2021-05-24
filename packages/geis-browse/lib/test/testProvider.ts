import { LocalFileAdapter } from '@geislabs/geis-file'
import { SessionProvider } from '../sessions'
import { BrowseTestConfig } from './testConfig'
import { BrowseTestAdapter } from './testImpl'

export function mock(
    content: BrowseTestConfig['content'] = {},
    opts: { rootDir?: string } = {}
): SessionProvider {
    return () =>
        new BrowseTestAdapter({
            content,
            file: new LocalFileAdapter({
                rootDir: opts.rootDir ?? __dirname,
            }),
        })
}
