import { Context } from '@nuxt/types'

export default function ({ $auth, redirect }: Context) {
  if (!$auth.loggedIn) {
    return redirect('/auth')
  } else if ($auth.user.authorities.includes(process.env.ROLE_ADMIN as string))
    return redirect('/admin')
}
