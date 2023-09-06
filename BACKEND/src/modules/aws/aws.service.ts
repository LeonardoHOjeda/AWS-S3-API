import fs from 'fs'
import * as os from 'os'
import { Readable } from 'stream'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import {
  S3Client,
  PutObjectCommand,
  ListObjectsCommand,
  GetObjectCommand,
  PutObjectCommandInput,
  DeleteObjectCommand,
  PutObjectCommandOutput
} from '@aws-sdk/client-s3'

import config from '@config/config'
import { Tenant } from '@prisma/client'
import { archivosService } from '@modules/archivos/archivos.service'
import { HTTPError } from '@middlewares/error_handler'

class AwsService {
  private readonly clientS3: S3Client

  constructor () {
    this.clientS3 = new S3Client({
      region: config.AWS.BUCKET_REGION,
      credentials: {
        accessKeyId: config.AWS.PUBLIC_KEY!,
        secretAccessKey: config.AWS.SECRET_KEY!
      }
    })
  }

  private getObjectCommand (fileName: string) {
    return new GetObjectCommand({
      Bucket: config.AWS.BUCKET_NAME!,
      Key: fileName
    })
  }

  async getFiles (): Promise<any> {
    const command = new ListObjectsCommand({
      Bucket: config.AWS.BUCKET_NAME!
    })

    return await this.clientS3.send(command)
  }

  async getFileByName (fileName: string): Promise<any> {
    const command = this.getObjectCommand(fileName)
    try {
      return await this.clientS3.send(command)
    } catch (error: any) {
      if (error.$metadata.httpStatusCode === 404) {
        throw new HTTPError(404, 'No se encontró el archivo')
      }
      throw error
    }
  }

  async uploadFile (file: Express.Multer.File, fileName: string): Promise<PutObjectCommandOutput> {
    const uploadParams = {
      Bucket: config.AWS.BUCKET_NAME!,
      Key: fileName,
      Body: file.buffer
    }

    const command = new PutObjectCommand(uploadParams)

    return await this.clientS3.send(command)
  }

  async uploadMultipleFiles (file: Express.Multer.File, awsFileName: string, tenantName: string, uuid: string): Promise<string> {
    const params = {
      Bucket: config.AWS.BUCKET_NAME!,
      Key: `${tenantName}/${awsFileName}`,
      Body: file.buffer
    }

    const command = new PutObjectCommand(params)
    await this.clientS3.send(command)
    console.log(uuid)

    return uuid
  }

  async downloadFile (key: string): Promise<void> {
    try {
      const command = this.getObjectCommand(key)
      const result = await this.clientS3.send(command)
      const readableStream = result.Body as Readable

      const downloadsFolder = os.homedir() + '/Downloads'

      if (!fs.existsSync(downloadsFolder)) {
        fs.mkdirSync(downloadsFolder)
      }

      const baseFileName = key.split('/')[1]
      let fileName = baseFileName

      // Verificar si el archivo ya existe en la carpeta de descargas
      let fileIndex = 0
      while (fs.existsSync(`${downloadsFolder}/${fileName}`)) {
        fileIndex++
        const [name, ext] = baseFileName.split('.')
        fileName = `${name}_${fileIndex}.${ext}`
      }

      const filePath = `${downloadsFolder}/${fileName}`
      console.log('Key: ', key)
      console.log('Filename: ', fileName)

      const writeStream = fs.createWriteStream(filePath)

      readableStream.pipe(writeStream)
    } catch (error: any) {
      if (error.$metadata.httpStatusCode === 404) {
        throw new HTTPError(404, 'No se encontró el archivo')
      }
      throw error
    }
  }

  async downloadFileBuffer (key: string): Promise<any> {
    const getFileByUUID = await archivosService.getFileByUuid(key)

    const fileName = getFileByUUID?.awsObjectKey
    const command = this.getObjectCommand(fileName!)

    const data = await this.clientS3.send(command)

    return data
  }

  // * PRESIGNED URL
  async getFileSignedUrl (fileName: string): Promise<string> {
    const command = this.getObjectCommand(fileName)

    return await getSignedUrl(
      this.clientS3,
      command,
      { expiresIn: 3600 }
    )
  }

  async uploadFileWithSignedUrl (tenant: Tenant, uploadParams: PutObjectCommandInput): Promise<string> {
    const command = new PutObjectCommand(uploadParams)
    const presignedURL = await getSignedUrl(
      this.clientS3,
      command,
      { expiresIn: tenant.presignedURLTime }
    )

    console.log('Presigned URL: ', presignedURL)

    return presignedURL
  }

  async deleteFile (fileName: string): Promise<any> {
    const command = new DeleteObjectCommand({
      Bucket: config.AWS.BUCKET_NAME!,
      Key: fileName
    })

    try {
      const response = await this.clientS3.send(command)
      console.log('Response: ', response)
    } catch (error) {
      console.log('Error en deleteFileFromS3: ', error)
    }

    const data = await this.clientS3.send(command)

    return data
  }
}

export const awsService = new AwsService()
