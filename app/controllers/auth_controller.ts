import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async redirect({ ally, params }: HttpContext) {
    const driverInstance = ally.use(params.driver)
    driverInstance.redirect((request: { scopes: (arg0: string[]) => void }) => {
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
    console.log(user)
    return inertia.render('dashboard/spotify', { user })
  }
}
