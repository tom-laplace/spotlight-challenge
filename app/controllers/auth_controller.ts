import MusicProvider, { MusicService } from '#services/music_provider_factory'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AuthController {
  constructor(protected musicProvider: MusicProvider) {}

  async spotifyRedirect({ ally }: HttpContext) {
    const driverInstance = ally.use('spotify')
    driverInstance.redirect((request) => {
      request.scopes(['user-top-read'])
    })
  }

  async spotifyCallback({ ally, inertia }: HttpContext) {
    const spotify = ally.use('spotify')

    if (spotify.accessDenied()) {
      return 'Access was denied'
    }

    if (spotify.stateMisMatch()) {
      return 'Request origin cannot be verified'
    }

    if (spotify.hasError()) {
      return spotify.getError()
    }

    const user = await spotify.user()
    const spotifyProvider = this.musicProvider.getProvider(MusicService.SPOTIFY, user.token.token)
    const topArtists = await spotifyProvider.getUserTopArtists(5)

    console.log(topArtists)

    // TODO: make a user presenter for Inertia
    const userPropsTest = {
      id: user.id,
      nickName: user.nickName.toString() as string,
    }

    return inertia.render('dashboard/spotify', { userPropsTest, topArtists })
  }
}
