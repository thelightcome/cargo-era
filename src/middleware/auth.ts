import { Context } from '@nuxt/types'

export default function ({ $auth, redirect }: Context) {
  if ($auth.loggedIn) {
    if (
      ($auth.user?.authorities as string[])?.includes(
        process.env.ROLE_ADMIN as string
      )
    ) {
      return redirect(302, '/admin')
    } else {
      return redirect(302, '/user')
    }
  }
}
