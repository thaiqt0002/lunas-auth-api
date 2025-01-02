import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'

import { BioRepo, UserRepo } from '~/cores/repositories'

import { UpdateUserDto } from '../dtos/update-user.dto'

export default class UpdateUserCmd extends UpdateUserDto implements ICommand {
  uuid: string
  constructor(data: { uuid: string } & UpdateUserDto) {
    super()
    Object.assign(this, data)
  }
}

@CommandHandler(UpdateUserCmd)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCmd> {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly bioRepo: BioRepo,
  ) {}
  public async execute(command: UpdateUserCmd): Promise<void> {
    return await this.update(command)
  }
  private async update(command: UpdateUserCmd): Promise<void> {
    const { uuid, email, fullname, phoneNumber, username } = command
    const user = await this.userRepo.findOne({ where: { uuid }, relations: { bio: true } })
    const { bio } = user
    if (user && email) {
      await this.userRepo.save({
        ...user,
        email,
      })
    }
    if (bio && (fullname || phoneNumber || username)) {
      await this.bioRepo.save({
        ...bio,
        fullname,
        phoneNumber,
        username,
      })
    }
  }
}
