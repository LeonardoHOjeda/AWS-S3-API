import fs from 'fs'
import { S3Client, PutObjectCommand, ListObjectsCommand, GetObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3'
import config from '../../config/config'
import { Readable } from 'stream'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import fileUpload from 'express-fileupload'

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

/** SUBIDA DE ARCHIVOS **/

// ? Subir un archivo a AWS S3 usando un presigned URL
export async function uploadURLToS3Service (uploadParams: PutObjectCommandInput): Promise<any> {
  const command = new PutObjectCommand(uploadParams)
  const presignedURL = await getSignedUrl(clientS3, command, { expiresIn: 3600 })

  console.log('Presigned URL: ', presignedURL)

  return presignedURL
}

// ? Subir un archivo a AWS S3 (File)
export async function uploadFileToS3Service (file: fileUpload.UploadedFile, fileName: string): Promise<any> {
  const stream = fs.createReadStream(file.tempFilePath)

  console.log('FileName: ', fileName)

  const uploadParams = {
    Bucket: config.AWS.BUCKET_NAME!,
    Key: fileName,
    Body: stream
  }

  const command = new PutObjectCommand(uploadParams)
  return await clientS3.send(command)
}
