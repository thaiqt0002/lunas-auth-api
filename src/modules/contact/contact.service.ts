import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'

import { ContactRepo } from '~/cores/repositories'

import { ICreateContactParams } from './contact.interface'
import SendEmailContactEvent from './events/send-email.event'

@Injectable()
export default class ContactService {
  constructor(
    private readonly repo: ContactRepo,
    private readonly emitService: EventEmitter2,
  ) {}

  async create(data: ICreateContactParams) {
    const contact = this.repo.create(data)

    this.emitService.emit(
      'send-contact-email',
      new SendEmailContactEvent(data.email, data.topic, data.content, data.phoneNumber, data.name),
    )
    await this.repo.save(contact)
    return 'C200_CONTACT_SUCCESS'
  }

  findAll() {
    return this.repo.findAll()
  }

  deleteById(id: number) {
    return this.repo.deleteById(id)
  }
}
