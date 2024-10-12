import { test } from '@japa/runner'
import nock from 'nock'
import { SpotifyProvider } from '../../../app/providers/spotify_provider.js'

test.group('SpotifyProvider', (group) => {
  function mockSpotifyApiSuccess() {
    nock('https://api.spotify.com/v1')
      .get('/me/top/artists')
      .query({ limit: 1, time_range: 'short_term' })
      .reply(200, {
        items: [
          {
            external_urls: {
              spotify: 'https://open.spotify.com/artist/1',
            },
            followers: {
              total: 100,
            },
            genres: ['pop'],
            href: 'https://api.spotify.com/v1/artists/1',
            id: '1',
            images: [
              {
                url: 'https://example.com/image.jpg',
              },
            ],
            name: 'Artist 1',
            popularity: 50,
            type: 'artist',
            uri: 'spotify:artist:1',
          },
        ],
      })
  }

  function mockSpotifyApiError() {
    nock('https://api.spotify.com/v1')
      .get('/me/top/artists')
      .query({ limit: 1, time_range: 'short_term' })
      .reply(500, 'Internal server error')
  }

  group.each.setup(() => {
    nock.cleanAll()
  })

  test('getUserTopArtists should return top artists', async ({ assert }) => {
    mockSpotifyApiSuccess()

    const authToken = 'authToken'
    const limit = 1
    const spotifyProvider = new SpotifyProvider(authToken)
    const topArtists = await spotifyProvider.getUserTopArtists(limit)

    assert.equal(topArtists.length, 1)
    assert.equal(topArtists[0].name, 'Artist 1')
    assert.equal(topArtists[0].followers.total, 100)
  })

  test('getUserTopArtists should throw an error on failure', async ({ assert }) => {
    mockSpotifyApiError()

    const authToken = 'authToken'
    const limit = 1
    const spotifyProvider = new SpotifyProvider(authToken)

    await assert.rejects(() => {
      return spotifyProvider.getUserTopArtists(limit)
    }, 'Failed to fetch top artists from Spotify')
  })
})
