import { SessionAdapter, SessionProvider } from './sessions/sessionAdapter'

export interface SessionConfig {
    browser: SessionAdapter
}

export interface BrowseConfig {
    adapter: SessionAdapter | SessionProvider
}

export interface BrowseProviderConfig extends Partial<BrowseConfig> {}
