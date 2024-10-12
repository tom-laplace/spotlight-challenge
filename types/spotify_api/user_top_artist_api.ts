import { SpotifyArtist } from './spotify_artist.js'

export type UserTopArtistApiResponse = {
  href: string
  limit: number
  next?: string
  offset: number
  previous?: string
  total: number
  items: SpotifyArtist[]
}
