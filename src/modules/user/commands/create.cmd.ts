import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { hash } from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

import { ENetwork, ERRORS } from '~/cores/constants'
import { BioRepo, NetworkRepo, UserRepo } from '~/cores/repositories'

import { UserCreateDto } from '../dtos/create-user.dto'

export default class CreateUserCmd extends UserCreateDto implements ICommand {
  constructor(data: UserCreateDto) {
    super()
    Object.assign(this, data)
  }
}

@CommandHandler(CreateUserCmd)
export class CreateUserHandler implements ICommandHandler<CreateUserCmd> {
  private readonly saltingRounds: number = 10
  constructor(
    private readonly userRepo: UserRepo,
    private readonly bioRepo: BioRepo,
    private readonly networkRepo: NetworkRepo,
  ) {}
  public async execute(command: CreateUserCmd): Promise<void> {
    await this.validate(command)
    await this.create(command)
  }
  private async create(command: CreateUserCmd): Promise<void> {
    const uuid = uuidv4()
    const { email, password, roleId, fullname, username } = command
    const hashedPassword = await this.hashPassword(password)
    const user = this.userRepo.create({ uuid, email, hashedPassword, roleId })
    const bio = this.bioRepo.create({ userUuid: uuid, fullname, username })
    const network = this.networkRepo.create({ userUuid: uuid, network: ENetwork.BASIC })
    await this.userRepo.save(user)
    await this.bioRepo.save(bio)
    await this.networkRepo.save(network)
    await this.userRepo.activeAccount(uuid)
  }
  private async validate(command: CreateUserCmd) {
    await this.checkExistEmail(command.email)
  }
  private async checkExistEmail(email: string) {
    const existingUser = await this.userRepo.findOne({ where: { email } })
    if (existingUser) {
      throw new RpcException(ERRORS.USERNAME_ALREADY_EXISTS)
    }
  }
  private async hashPassword(pwd: string) {
    return await hash(pwd, this.saltingRounds)
  }
}
