import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { Readable } from 'stream'
import { S3Client, PutObjectCommand, ListObjectsCommand, GetObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3'
import fs from 'fs'
import config from '../../config/config'
import { getSingleFileService } from '@modules/archivos/archivos.service'
import { Tenant } from '@prisma/client'

const clientS3 = new S3Client({
  region: config.AWS.BUCKET_REGION,
  credentials: {
    accessKeyId: config.AWS.PUBLIC_KEY!,
    secretAccessKey: config.AWS.SECRET_KEY!
  }
})

const getObjectCommand = (fileName: string) => {
  return new GetObjectCommand({
    Bucket: config.AWS.BUCKET_NAME!,
    Key: fileName
  })
}

// ? Obtener los archivos que se encuentran en AWS S3
export async function getFilesFromS3Service (): Promise<any> {
  const command = new ListObjectsCommand({
    Bucket: config.AWS.BUCKET_NAME!
  })
  return await clientS3.send(command)
}

// ? Obtener un archivo de AWS S3 por su UUID
export async function getSingleFileFromS3Service (fileName: string): Promise<any> {
  const command = getObjectCommand(fileName)

  return await clientS3.send(command)
}

/** OBTENCION DE ARCHIVOS **/

// ? Obtener un presigned URL de AWS S3 por el UUID del archivo
export async function getFileSignedUrlFromS3Service (fileName: string): Promise<any> {
  const command = getObjectCommand(fileName)

  return await getSignedUrl(clientS3, command, { expiresIn: 3600 })
}

// ? Descargar un archivo de AWS S3 por su UUID
export async function downloadFileFromS3Service (fileName: string): Promise<any> {
  const command = getObjectCommand(fileName)

  const result = await clientS3.send(command)

  const readableStream = result.Body as Readable
  const writeStream = fs.createWriteStream(`./downloads/${fileName}`)
  readableStream.pipe(writeStream)
}

// ? Descargar un archivo de AWS
export async function downloadFileFromS3 (uuid: string): Promise<any> {
  const getFileByUUID = await getSingleFileService(uuid)

  const fileName = getFileByUUID?.awsObjectKey
  const command = getObjectCommand(fileName!)

  const data = await clientS3.send(command)

  return data
}

/** SUBIDA DE ARCHIVOS **/
// ? Subir un archivo a AWS S3 usando un presigned URL
export async function uploadURLToS3Service (tenant: Tenant, uploadParams: PutObjectCommandInput): Promise<any> {
  const command = new PutObjectCommand(uploadParams)
  const presignedURL = await getSignedUrl(clientS3, command, { expiresIn: tenant.presignedURLTime })

  console.log('Presigned URL: ', presignedURL)

  return presignedURL
}

// ? Subir un archivo a AWS S3 (File)
export async function uploadFileToS3Service (file: Express.Multer.File, fileName: string): Promise<any> {
  const uploadParams = {
    Bucket: config.AWS.BUCKET_NAME!,
    Key: fileName,
    Body: file.buffer
  }

  const command = new PutObjectCommand(uploadParams)
  return await clientS3.send(command)
}

export async function uploadMultipleFilesToS3 (file: Express.Multer.File, tenantId: string, uuid: string): Promise <any> {
  const params = {
    Bucket: config.AWS.BUCKET_NAME!,
    Key: `${tenantId}/${uuid}-${file.originalname}`,
    Body: file.buffer
  }

  const command = new PutObjectCommand(params)
  await clientS3.send(command)
  console.log(uuid)

  return uuid
}
