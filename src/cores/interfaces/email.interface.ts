export interface IBaseEmail {
  id: number
  email: string
  userUuid: string
  code: string
  expiredAt: Date
  verifiedAt: Date
  createdAt: Date
}
