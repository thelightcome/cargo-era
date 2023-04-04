import { ICreateUserDto, IRespawnUserDto } from 'types/auth.types'

import Base from './base'

export default class Auth extends Base {
  register(payload: ICreateUserDto) {
    return this.POST('/register', payload, {})
  }

  getRespawnCode(login: string) {
    return this.POST(`/account/reset-password/init`, { email: login }, {})
  }

  respawn(login: IRespawnUserDto) {
    return this.POST('/account/reset-password/finish', login, {})
  }

  activate(key: string) {
    return this.GET(`/activate?key=${key}`, {})
  }
}
