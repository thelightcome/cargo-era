import { IChangePassword, IUserData } from 'types/auth.types'

import Base from './base'

export default class User extends Base {
  async changeData(data: IUserData) {
    return await this.POST(`/account`, data, {})
  }

  async changePassword(data: IChangePassword) {
    return await this.POST(`/account/change-password`, data, {})
  }
}
