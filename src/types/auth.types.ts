export interface IUserData {
  firstName: string
  lastName: string
  phoneNumber: string
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
  email: string
  password: string
}

export interface IRespawnUserDto {
  code: string
  email: string
  password: string
}
