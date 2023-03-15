import { Context } from '@nuxt/types'

import Auth from './auth'
import Product from './product'
import User from './user'

export type repositoriesType = {
  auth: Auth
  product: Product
  user: User
}

const repositories = (ctx: Context): repositoriesType => ({
  auth: new Auth(ctx.$services.common.http),
  product: new Product(ctx.$services.common.http),
  user: new User(ctx.$services.common.http),
})

export default repositories
