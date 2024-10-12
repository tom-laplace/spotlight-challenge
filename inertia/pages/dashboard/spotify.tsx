import AuthController from '#controllers/auth_controller'
import { InferPageProps } from '@adonisjs/inertia/types'

export default function SpotifyDashboard(props: InferPageProps<AuthController, 'spotifyCallback'>) {
  return (
    <div>
      <h1>Spotify Dashboard</h1>
      <p>Welcome, {props.user.display_name}</p>
    </div>
  )
}
