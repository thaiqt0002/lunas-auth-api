import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService, JwtSignOptions } from '@nestjs/jwt'
import { CookieOptions, Response } from 'express'

import { IConfig } from '~/cores/configs/interface'
import { MILLIESCOND_PER_HOUR } from '~/cores/constants'
import { ERole, IPayloadJwt } from '~/cores/interfaces'

abstract class ITokenService {
  readonly genCookieOption: CookieOptions
  readonly atOptions: JwtSignOptions
  readonly rtOptions: JwtSignOptions
  readonly verifyTokenOptions: JwtSignOptions

  abstract setCookie(res: Response, user: IPayloadJwt): void
  abstract generateToken(payload: object, options: JwtSignOptions): string
  abstract verify(token: string, secret: string): Promise<{ iat: number; exp: number; uuid: string; role: ERole }>
}
@Injectable()
class TokenService implements ITokenService {
  private readonly atName = 'access_token'

  private readonly rtName = 'refresh_token'

  private readonly serverDomain = this.configServ.get('SERVER_DOMAIN')

  private readonly accessTokenSecret = this.configServ.get('ACCESS_TOKEN_SECRET')

  private readonly accessTokenExpiresIn = this.configServ.get('ACCESS_TOKEN_EXPIRES_IN')

  private readonly refreshTokenSecret = this.configServ.get('REFRESH_TOKEN_SECRET')

  private readonly refreshTokenExpiresIn = this.configServ.get('REFRESH_TOKEN_EXPIRES_IN')

  private readonly verifyTokenSecret = this.configServ.get('VERIFY_TOKEN_SECRET')

  private readonly verifyTokenExpiresIn = this.configServ.get('VERIFY_TOKEN_EXPIRES_IN')

  constructor(
    private readonly jwtServ: JwtService,
    private readonly configServ: ConfigService<IConfig>,
  ) {}

  public atOptions = {
    secret: this.accessTokenSecret,
    expiresIn: this.accessTokenExpiresIn,
  }

  public genCookieOption = {
    maxAge: MILLIESCOND_PER_HOUR,
    httpOnly: false,
    secure: false,
    sameSite: 'strict' as CookieOptions['sameSite'],
    domain: this.serverDomain,
  }

  public rtOptions = {
    secret: this.refreshTokenSecret,
    expiresIn: this.refreshTokenExpiresIn,
  }

  public verifyTokenOptions = {
    secret: this.verifyTokenSecret,
    expiresIn: this.verifyTokenExpiresIn,
  }

  public setCookie(res: Response, user: IPayloadJwt) {
    const at = this.generateToken(user, this.atOptions)
    const rt = this.generateToken(user, this.rtOptions)
    res.cookie(this.atName, at, this.genCookieOption)
    res.cookie(this.rtName, rt, this.genCookieOption)
  }

  public verify(token: string, secret: string): Promise<{ iat: number; exp: number; uuid: string; role: ERole }> {
    return this.jwtServ.verify(token, { secret })
  }

  public generateToken(payload: IPayloadJwt, options: JwtSignOptions) {
    return this.jwtServ.sign(payload, options)
  }
}
export default TokenService
