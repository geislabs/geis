import { LocalFileAdapter } from '@geis-studio/lib-file'
import { SessionProvider } from '../sessions'
import { BrowseTestConfig } from './testConfig'
import { BrowseTestAdapter } from './testImpl'

export function mock(
    content: BrowseTestConfig['content'] = {},
    opts: { rootDir?: string } = {}
): SessionProvider {
    return async () =>
        new BrowseTestAdapter({
            content,
            file: new LocalFileAdapter({
                rootDir: opts.rootDir ?? __dirname,
            }),
        })
}
