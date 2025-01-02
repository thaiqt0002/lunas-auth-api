export default class SendEmailContactEvent {
  email: string
  topic: string
  content: string
  phoneNumber: string
  name: string

  constructor(email: string, topic: string, content: string, phoneNumber: string, name: string) {
    this.email = email
    this.topic = topic
    this.content = content
    this.phoneNumber = phoneNumber
    this.name = name
  }
}
