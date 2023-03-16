import { Context } from '@nuxt/types'
import { Middleware } from '@nuxt/types'

const adminMiddlewar: Middleware = ({ $auth, redirect }: Context) => {
  if (!$auth.loggedIn) {
    return redirect('/auth')
  } else if ($auth.user.authorities.includes(process.env.ROLE_ADMIN as string))
    return redirect('/admin')
}

export default adminMiddlewar
