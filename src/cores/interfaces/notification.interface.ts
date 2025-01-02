export interface IBaseNotification {
  id: number
  userUuid: string
  type: string
  title: string
  content: string
  isRead: boolean
}
