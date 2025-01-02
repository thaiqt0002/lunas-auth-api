import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger'
import { IncomingMessage, Server, ServerResponse } from 'node:http'
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes'

import description from './descriptions'

class DocumentBuild {
  #app: NestExpressApplication<Server<typeof IncomingMessage, typeof ServerResponse>>

  #paths = '/v1/docs'

  #title = 'Lunas E-Commerce API'

  #version = '0.0.1'

  #contact = {
    name: 'Lunas Support',
    url: 'https://lunas.com/support',
    email: 'support@lunas.com',
  }

  #config = new DocumentBuilder()
    .setTitle(this.#title)
    .setDescription(description)
    .setVersion(this.#version)
    .setContact(this.#contact.name, this.#contact.url, this.#contact.email)
    .build()

  constructor(public readonly app: NestExpressApplication<Server<typeof IncomingMessage, typeof ServerResponse>>) {
    this.#app = app
  }

  public build() {
    this.#createSwaggerModule(this.#paths, this.#config, [])
  }

  #createSwaggerModule(path: string, config: Omit<OpenAPIObject, 'paths'>, include: any[]) {
    const document = SwaggerModule.createDocument(this.#app, config, { include })
    const theme = new SwaggerTheme()
    SwaggerModule.setup(path, this.#app, document, {
      customSiteTitle: 'Lunas API Documentation',
      customfavIcon: 'https://store.lunas.vn/favicon.ico',
      explorer: true,
      customCss: theme.getBuffer(SwaggerThemeNameEnum.DRACULA),
    })
  }
}
export default DocumentBuild
