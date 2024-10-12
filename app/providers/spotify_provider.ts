import { SpotifyArtist } from '../../types/spotify_api/spotify_artist.js'
import { MusicProvider } from './music_provider_factory.js'
import axios from 'axios'

export class SpotifyProvider implements MusicProvider {
  private readonly baseUrl = 'https://api.spotify.com/v1'
  private readonly authToken: string

  constructor(authToken: string) {
    this.authToken = authToken
  }

  async getUserTopArtists(limit: number): Promise<SpotifyArtist[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/me/top/artists`, {
        params: { limit, time_range: 'short_term' },
        headers: { Authorization: `Bearer ${this.authToken}` },
      })

      return response.data.items.map((artist: SpotifyArtist) => artist)
    } catch (error) {
      console.error('Error fetching top artists from Spotify:', error)
      throw new Error('Failed to fetch top artists from Spotify')
    }
  }
}
