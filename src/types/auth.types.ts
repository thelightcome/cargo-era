export interface IUserData {
  login: string
  firstName: string
  lastName: string
  tel: string
  email: string
}

export interface IChangePassword {
  currentPassword: string
  newPassword: string
}

export interface ICreateUserDto extends IUserData {
  password: string
}

export interface ILoginUserDto {
  login: string
  password: string
}

export interface IRespawnUserDto {
  code: string
  password: string
}
