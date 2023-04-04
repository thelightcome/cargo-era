import { Context, Middleware } from '@nuxt/types'

const adminMiddlewar: Middleware = ({ $auth, redirect }: Context) => {
  if (!$auth.loggedIn) {
    return redirect('/auth')
  } else if (!$auth.user.authorities.includes(process.env.ROLE_ADMIN as string))
    return redirect('/user')
}

export default adminMiddlewar
