import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { v4 as uuidv4 } from 'uuid'

import { IConfig } from '~/cores/configs/interface'

@Injectable()
export default class HelperService {
  #configService: ConfigService<IConfig>

  constructor(configService: ConfigService) {
    this.#configService = configService
  }

  isObjectsUniqueValueKey(array: object[], key: string): boolean {
    const values = array.map((item) => item[key])
    return new Set(values).size === values.length
  }

  slugify(convertString: string): string {
    const alpha = 'àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;'
    const beta = 'aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const regExp = new RegExp(alpha.split('').join('|'), 'g')
    return convertString
      .toString()
      .toLowerCase()
      .replaceAll(/[àáâãăạảấầẩẫậắằẳẵặ]/gi, 'a')
      .replaceAll(/[èéêẹẻẽếềểễệ]/gi, 'e')
      .replaceAll(/[iìíĩỉị]/gi, 'i')
      .replaceAll(/[òóôõơọỏốồổỗộớờởỡợ]/gi, 'o')
      .replaceAll(/[ùúũưụủứừửữự]/gi, 'u')
      .replaceAll(/[ýỳỵỷỹ]/gi, 'y')
      .replaceAll(/đ/gi, 'd')
      .replaceAll(/\s+/g, '-')
      .replaceAll(regExp, (content) => beta.charAt(alpha.indexOf(content)))
      .replaceAll('&', '-and-')
      .replaceAll(/[^\w-]+/g, '')
      .replaceAll(/--+/g, '-')
      .replaceAll(/^-+/, '')
      .replaceAll(/-+$/, '')
  }

  filterObject(filterObject: object, keys: string[]): object {
    let element: object = {}
    return keys.reduce((newObject: Record<string, any>, key) => {
      if (filterObject[key]) {
        element = { [key]: filterObject[key] }
      }
      return { ...newObject, ...element }
    }, {})
  }

  getURLImage(image: string): string {
    return `${this.#configService.get('IMAGE_BASE_URL')}/${image}`
  }

  getUniqueListBy<T extends object>(array: T[], key: keyof T): T[] {
    return [...new Map(array.map((item) => [item[key], item])).values()]
  }

  getUserNameRandomFromEmail(email: string): string {
    let [username] = email.split('@')
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    Array.from({ length: 4 }).forEach(() => {
      username += possible.charAt(Math.floor(Math.random() * possible.length))
    })
    return username
  }

  generateUUID(): string {
    return uuidv4()
  }

  generateOTP(): string {
    const startCode = 1000
    const endCode = 9000
    return Math.floor(startCode + Math.random() * endCode).toString()
  }

  generateKey(length: number) {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const { length: charactersLength } = characters
    let counter = 0
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
      counter += 1
    }
    return result + String(Date.now())
  }

  generateTimeBasedOTP(): string {
    // eslint-disable-next-line no-magic-numbers, unicorn/numeric-separators-style
    return (Date.now() % 1000000).toString().padStart(6, '0')
  }
}
