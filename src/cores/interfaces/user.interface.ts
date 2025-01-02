export interface IBaseUser {
  uuid: string
  email: string
  hashedPassword: string
  refreshToken: string
  roleId: number
  isActivated: number
  createdAt: Date
  updatedAt: Date
}

export interface GetUserDetailParams {
  uuid: string
}
export interface IDeleteUserParams {
  uuid: string
}
