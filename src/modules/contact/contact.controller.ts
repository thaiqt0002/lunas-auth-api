import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'

import { ICreateContactParams } from './contact.interface'
import ContactService from './contact.service'

@Controller()
export default class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @MessagePattern('contacts.cms.get_all')
  getAll() {
    return this.contactService.findAll()
  }

  @MessagePattern('contacts.users.create')
  create(@Payload() data: ICreateContactParams) {
    return this.contactService.create(data)
  }

  @MessagePattern('contacts.cms.delete')
  delete(@Payload() id: number) {
    return this.contactService.deleteById(id)
  }
}
