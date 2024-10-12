import { SpotifyArtist } from '../../types/spotify_api/spotify_artist.js'
import { SpotifyProvider } from './spotify_provider.js'

export interface MusicProvider {
  getUserTopArtists(limit: number): Promise<SpotifyArtist[]>
}

export enum MusicService {
  SPOTIFY = 'spotify',
}

export class MusicProviderFactory {
  private static providers: Map<MusicService, MusicProvider> = new Map()

  static getProvider(service: MusicService, authToken: string): MusicProvider {
    if (!this.providers.has(service)) {
      switch (service) {
        case MusicService.SPOTIFY:
          this.providers.set(service, new SpotifyProvider(authToken))
          break
        default:
          throw new Error('Invalid music service')
      }
    }

    return this.providers.get(service)!
  }
}
