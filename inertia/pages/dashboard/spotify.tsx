import AuthController from '#controllers/auth_controller'
import { InferPageProps } from '@adonisjs/inertia/types'

export default function SpotifyDashboard(props: InferPageProps<AuthController, 'spotifyCallback'>) {
  return (
    <div>
      <div>
        <h1>Spotify Dashboard</h1>
        <p>Welcome, {props.userPropsTest.nickName}</p>
      </div>

      <div>
        <h2>Top Artists</h2>
        <ul>
          {props.topArtists.map((artist) => (
            <li key={artist.id}>{artist.name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
