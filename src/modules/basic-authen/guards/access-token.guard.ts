import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { RpcException } from '@nestjs/microservices'
import { Request } from 'express'

import { IConfig } from '~/cores/configs/interface'
import { ERRORS, IS_PUBLIC_KEY } from '~/cores/constants'

type TPayload = {
  uuid: string
  role: string
}

@Injectable()
export class AtGuard implements CanActivate {
  private readonly accessTokenSecret = this.configService.get('ACCESS_TOKEN_SECRET')

  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly configService: ConfigService<IConfig>,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, ctx.getHandler())
    if (isPublic) {
      return true
    }
    const req = ctx.switchToHttp().getRequest<Request>() as Request & TPayload
    const token = this.extractTokenFromRequest(req)
    if (!token) {
      throw new RpcException(ERRORS.INVALID_TOKEN)
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: this.accessTokenSecret })
      const { uuid, role } = payload
      if (!uuid) {
        throw new RpcException(ERRORS.INVALID_TOKEN)
      }
      req.uuid = uuid
      req.role = role
      return true
    } catch {
      throw new RpcException(ERRORS.INVALID_TOKEN)
    }
  }

  private extractTokenFromRequest(req: Request & TPayload): string | null {
    const tokenBearer = req.headers.authorization?.split(' ')[1] ?? null
    const tokenCookie = req.cookies.access_token ?? null
    if (!tokenBearer && !tokenCookie) {
      return null
    }
    return tokenBearer || tokenCookie
  }
}
