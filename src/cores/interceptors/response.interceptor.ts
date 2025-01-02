import { CallHandler, ExecutionContext, HttpStatus, Injectable, Logger, NestInterceptor } from '@nestjs/common'
import { Request, Response } from 'express'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { IResponse } from '../interfaces'

@Injectable()
class ResponseInterceptor<T> implements NestInterceptor<T, IResponse<T>> {
  #logger = new Logger('Interceptor')

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<IResponse<T>> {
    this.#loggerInfo(ctx)
    return this.#transformData(next, ctx)
  }

  #transformData(next: CallHandler, ctx: ExecutionContext): Observable<IResponse<T>> {
    const { statusCode } = ctx.switchToHttp().getResponse<Response>()
    ctx.switchToHttp().getResponse().status(HttpStatus.OK)
    return next.handle().pipe(
      map((data) => {
        if (typeof data === 'string') {
          return {
            statusCode,
            data: null,
            message: data,
            error: null,
          }
        }
        return {
          statusCode,
          data: data === null ? '' : data,
          message: null,
          error: null,
        }
      }),
    )
  }

  #loggerInfo(ctx: ExecutionContext) {
    const { method, originalUrl, ip } = ctx.switchToHttp().getRequest<Request>()
    const { statusMessage, statusCode } = ctx.switchToHttp().getResponse<Response>()
    const message = `${method} ${originalUrl} ${statusCode} ${ip} ${statusMessage}`

    if (this.#acceptOrignalUrl(originalUrl)) return
    if (statusCode < HttpStatus.BAD_REQUEST) this.#logger.log(message)
  }

  #acceptOrignalUrl(originalUrl: string): boolean {
    const FAVICON = '/favicon.ico'
    const CHECKHEALTH = '/api/v1/checkhealth'
    return originalUrl === FAVICON || originalUrl === CHECKHEALTH
  }
}
export default ResponseInterceptor
