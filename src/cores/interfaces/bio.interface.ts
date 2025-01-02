export interface IBaseBio {
  id: number
  avatar: string
  userUuid: string
  username: string
  fullname: string
  phoneNumber: string
  createdAt: Date
  updatedAt: Date
}

export interface IGetAvatarParams {
  uuid: string
}
