export class SpotifyApi {
  private readonly BASE_URL = 'https://api.spotify.com'
  private readonly PLAYLIST_ENDPOINT = '/v1/playlists'
  private readonly TOP_50_PLAYLIST_ID = '37i9dQZEVXbMDoHDwVN2tF'

  async getTracksFromTop50PlaylistId(): Promise<Response> {
    const response = await fetch(
      `${this.BASE_URL}${this.PLAYLIST_ENDPOINT}/${this.TOP_50_PLAYLIST_ID}/tracks`
    )

    if (response.status !== 200) {
      throw new Error('Failed to fetch playlist')
    }

    return response
  }
}
