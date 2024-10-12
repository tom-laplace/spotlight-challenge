import { Head } from '@inertiajs/react'

export default function Home() {
  return (
    <>
      <Head title="Homepage" />

      <h1>Bienvenue sur Spotlight Challenge</h1>
      <p>Connectez-vous avec application musicale préférée pour commencer</p>

      <div>
        <a href="/spotify/redirect">Connexion avec Spotify</a>
      </div>
    </>
  )
}
