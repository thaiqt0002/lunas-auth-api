import { CopyObjectCommand, DeleteObjectsCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { IConfig } from '~/cores/configs/interface'

@Injectable()
export default class S3Service {
  #bucketName!: string

  #S3 = new S3Client([
    {
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        sercetAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    },
  ])

  constructor(private readonly configService: ConfigService<IConfig>) {
    this.#bucketName = configService.get('AWS_BUCKET_NAME')
  }

  public getPreSignedUrl(Key: string) {
    const command = new PutObjectCommand({ Bucket: this.#bucketName, Key })
    return getSignedUrl(this.#S3, command, { expiresIn: 3600 })
  }

  public copyObject(sourceKey: string, destinationKey: string) {
    const command = new CopyObjectCommand({
      Bucket: this.#bucketName,
      CopySource: `${this.#bucketName}/${sourceKey}`,
      Key: destinationKey,
    })
    return this.#S3.send(command)
  }

  public deleteObject(Objects: { Key: string }[]) {
    const command = new DeleteObjectsCommand({ Bucket: this.#bucketName, Delete: { Objects } })
    return this.#S3.send(command)
  }
}
