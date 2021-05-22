import { LocalFileAdapter } from '@geis-studio/lib-file'
import { SessionProvider } from './sessions/sessionAdapter'
import { BrowseTestAdapter } from './test'

export const DEFAULT_PROVIDER: SessionProvider = async () =>
    new BrowseTestAdapter({
        file: new LocalFileAdapter({ rootDir: __dirname }),
    })
