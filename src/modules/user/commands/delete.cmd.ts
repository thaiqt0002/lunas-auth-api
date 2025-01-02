import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'

import { UuidDto } from '~/cores/dtos'
import { IDeleteUserParams } from '~/cores/interfaces'
import { BioRepo, NetworkRepo, UserRepo } from '~/cores/repositories'

export default class DeleteUserCmd extends UuidDto implements ICommand {
  constructor({ uuid }: IDeleteUserParams) {
    super()
    this.uuid = uuid
  }
}

@CommandHandler(DeleteUserCmd)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCmd> {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly networkRepo: NetworkRepo,
    private readonly bioRepo: BioRepo,
  ) {}

  async execute(command: DeleteUserCmd): Promise<void> {
    await this.delete(command.uuid)
  }

  private async delete(uuid: string) {
    await this.userRepo.deleteByUuid(uuid)
    await this.networkRepo.deleteByUserUuid(uuid)
    await this.bioRepo.deleteByUserUuid(uuid)
  }
}
