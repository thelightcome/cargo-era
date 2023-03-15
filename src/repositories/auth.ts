import { ICreateUserDto, IRespawnUserDto } from 'types/auth.types'

import Base from './base'

export default class Auth extends Base {
  async register(payload: ICreateUserDto) {
    return await this.POST('/register', payload, {})
  }

  async getRespawnCode(login: string) {
    return await this.POST('/account/reset-password/init', login, {})
  }

  async respawn(login: IRespawnUserDto) {
    return await this.POST('/account/reset-password/finish', login, {})
  }
}
