import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { RpcException } from '@nestjs/microservices'
import { DataSource } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

import { ENetwork, ERRORS, MILLIESCOND_PER_MINUTE, OTP_EXPIRE_TIME } from '~/cores/constants'
import { EmailDto } from '~/cores/dtos/email.dto'
import { UuidDto } from '~/cores/dtos/uuid.dto'
import { NetworkEntity, UserEntity } from '~/cores/entities'
import { ERole, IGoogleParams, IPayloadJwt } from '~/cores/interfaces'
import HelperService from '~/cores/modules/helper/service'
import { BioRepo, EmailRepo, NetworkRepo, RoleRepo, UserRepo } from '~/cores/repositories'

import { CreateUserDto } from './dtos/create-user.dto'
import { SendOtpEmailEvent } from './events/send-otp-email.event'

abstract class IUserService {
  public abstract create(type: ENetwork, params: CreateUserDto): Promise<IPayloadJwt>
  public abstract findById(uuid: UuidDto): Promise<UserEntity>
  public abstract findByEmail(email: EmailDto): Promise<UserEntity>
  public abstract findNetworkByUserId(uuid: UuidDto, network: ENetwork): Promise<NetworkEntity>
  public abstract activeAccount(uuid: UuidDto): Promise<void>
}
@Injectable()
class UserService implements IUserService {
  constructor(
    private readonly helperServ: HelperService,
    private readonly userRepo: UserRepo,
    private readonly bioRepo: BioRepo,
    private readonly emailRepo: EmailRepo,
    private readonly networkRepo: NetworkRepo,
    private readonly roleRepo: RoleRepo,
    private readonly dataSource: DataSource,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async create(type: ENetwork, params: CreateUserDto): Promise<IPayloadJwt> {
    const userId = uuidv4()
    if (type === ENetwork.BASIC) {
      return await this.createByBasic(params, userId)
    }
    if (type === ENetwork.GOOGLE) {
      return await this.createByGoogle({ email: params.email, name: params.fullname }, userId)
    }
    throw new RpcException(ERRORS.INVALID_NETWORK_TYPE)
  }

  private async createByBasic(params: CreateUserDto, userUuid: string): Promise<IPayloadJwt> {
    const { email, fullname, hashedPassword } = params
    const existingUser = await this.userRepo.findOne({ where: { email }, relations: { role: true } })

    if (existingUser && !existingUser.isActivated) {
      throw new RpcException(ERRORS.USER_IS_NOT_ACTIVATED)
    }

    return existingUser
      ? await this.handleExistingUser(existingUser, hashedPassword)
      : await this.handleNewUser({ userUuid, email, fullname, hashedPassword })
  }

  private async createByGoogle(params: IGoogleParams, userUuid: string): Promise<IPayloadJwt> {
    const { email, name } = params
    const existingUser = await this.userRepo.findOne({ where: { email }, relations: { role: true } })
    if (existingUser && (await this.isGoogleNetworkExists(existingUser.uuid))) {
      return { uuid: existingUser.uuid, role: existingUser.role.name }
    }
    return existingUser
      ? this.handleExistingUser(existingUser, '', ENetwork.GOOGLE)
      : this.handleNewUser({ userUuid, email, fullname: name, hashedPassword: '' }, ENetwork.GOOGLE)
  }

  private async handleNewUser(
    params: {
      userUuid: string
      email: string
      fullname: string
      hashedPassword: string
    },
    network: ENetwork = ENetwork.BASIC,
  ): Promise<IPayloadJwt> {
    const { userUuid, email, fullname, hashedPassword } = params
    const role = await this.getUserRole(ERole.USER)
    const username = this.helperServ.getUserNameRandomFromEmail(email)

    // Transactional approach to ensure atomicity
    return this.dataSource.transaction(async (manager) => {
      const userData = {
        email,
        hashedPassword,
        roleId: role.id,
        uuid: userUuid,
        ...(network === ENetwork.GOOGLE ? { isActivated: 1 } : {}),
      }
      const bioData = {
        userUuid,
        username,
        fullname,
      }
      const networkData = {
        network,
        userUuid,
      }
      const emailData = {
        email,
        userUuid,
        verifiedAt: new Date(),
        createAt: new Date(),
      }
      const newUser = this.userRepo.create(userData)
      const newBio = this.bioRepo.create(bioData)
      const newEmail = this.emailRepo.create(emailData)
      const newNetwork = this.networkRepo.create(networkData)

      await manager.save(newUser)
      await manager.save(newBio)
      await manager.save(newEmail)
      await manager.save(newNetwork)

      return { uuid: userUuid, role: role.name }
    })
  }

  private async handleExistingUser(user: UserEntity, hashedPassword: string, network: ENetwork = ENetwork.BASIC) {
    const { uuid, role } = user
    if (network === ENetwork.BASIC && (await this.isBasicNetworkExists(uuid))) {
      throw new RpcException(ERRORS.YOU_ALREADY_HAVE_AN_ACCOUNT_BY_BASIC)
    }

    if (network === ENetwork.GOOGLE && (await this.isGoogleNetworkExists(uuid))) {
      throw new RpcException(ERRORS.YOU_ALREADY_HAVE_AN_ACCOUNT_BY_GOOGLE)
    }

    // Update user's password and add new network
    await this.updatePwd(uuid, hashedPassword)
    await this.addNetwork(uuid, network)

    return { uuid, role: role.name }
  }

  private async updatePwd(userUuid: string, hashedPassword: string, network: ENetwork = ENetwork.BASIC) {
    if (network === ENetwork.GOOGLE) {
      return
    }
    await this.userRepo.updatePwd(userUuid, hashedPassword)
  }

  private async addNetwork(userUuid: string, network: ENetwork = ENetwork.BASIC) {
    const newNetwork = this.networkRepo.create({ network, userUuid })
    await this.networkRepo.save(newNetwork)
  }

  private async getUserRole(name: ERole) {
    const role = await this.roleRepo.findOne({ where: { name } })
    if (!role) {
      throw new RpcException(ERRORS.ROLE_NOT_FOUND)
    }
    return role
  }

  private async isBasicNetworkExists(userUuid: string): Promise<boolean> {
    const network = await this.networkRepo.findByUserUuidAndType(ENetwork.BASIC, userUuid)
    return Boolean(network)
  }

  private async isGoogleNetworkExists(userUuid: string): Promise<boolean> {
    const network = await this.networkRepo.findByUserUuidAndType(ENetwork.GOOGLE, userUuid)
    return Boolean(network)
  }

  async findById({ uuid }: UuidDto) {
    return await this.userRepo.findOneByUuid(uuid)
  }

  async findByEmail({ email }: EmailDto): Promise<UserEntity> {
    return await this.userRepo.findByEmail(email)
  }

  async findNetworkByUserId({ uuid }: UuidDto, network: ENetwork): Promise<NetworkEntity> {
    return await this.networkRepo.findByUserUuidAndType(network, uuid)
  }

  async activeAccount({ uuid }: UuidDto) {
    await this.userRepo.activeAccount(uuid)
  }

  async getOtpEmail({ uuid, email, type }: { uuid: string; email: string; type: 'GET_OTP' | 'RESET_OTP' }) {
    const code = this.helperServ.generateTimeBasedOTP()
    if (type === 'GET_OTP') {
      const isExistEmail = await this.emailRepo.findOne({ where: { userUuid: uuid, email } })
      if (isExistEmail && isExistEmail.expiredAt.getTime() > Date.now()) {
        throw new RpcException(ERRORS.WAIT_FOR_OTP_EXPIRED)
      }
      if (isExistEmail && isExistEmail.verifiedAt) {
        throw new RpcException(ERRORS.EMAIL_IS_VERIFIED)
      }
      const emailData = {
        email,
        userUuid: uuid,
        code,
        expiredAt: new Date(Date.now() + OTP_EXPIRE_TIME),
      }
      const newEmail = this.emailRepo.create(emailData)
      await this.emailRepo.save(newEmail)
    }
    if (type === 'RESET_OTP') {
      const isExistEmail = await this.emailRepo.findOne({ where: { userUuid: uuid, email } })
      if (!isExistEmail) {
        throw new RpcException(ERRORS.EMAIL_NOT_FOUND)
      }
      if (isExistEmail.createdAt.getTime() + MILLIESCOND_PER_MINUTE > Date.now()) {
        throw new RpcException(ERRORS.NOT_ALLOW_TO_RESET_OTP)
      }
      const emailData = {
        code,
        expiredAt: new Date(Date.now() + OTP_EXPIRE_TIME),
        createdAt: new Date(),
      }
      await this.emailRepo.updateEmail(isExistEmail.id, emailData)
    }
    this.eventEmitter.emit('send-otp-email', new SendOtpEmailEvent(email, code))
    return { uuid, email }
  }

  async verifyEmailOpt({ uuid, code, email }: { uuid: string; code: string; email: string }) {
    const emailData = await this.emailRepo.findOne({ where: { userUuid: uuid, email } })
    if (!emailData) {
      throw new RpcException(ERRORS.EMAIL_NOT_FOUND)
    }
    if (emailData.code !== code) {
      throw new RpcException(ERRORS.INVALID_OTP)
    }
    if (emailData.expiredAt.getTime() < Date.now()) {
      throw new RpcException(ERRORS.OTP_EXPIRED)
    }
    await this.emailRepo.verifyEmailOtp(uuid, email, code)
    return { uuid, email }
  }
}
export default UserService
