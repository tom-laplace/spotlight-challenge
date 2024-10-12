/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const AuthController = () => import('#controllers/auth_controller')

router.on('/').renderInertia('home')

// Social Authentication Routes (Ally)
router.get(':params/redirect', [AuthController, 'redirect']).where('params', /spotify/)
router.get('spotify/callback', [AuthController, 'spotifyCallback'])
