/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { NextFunction, Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import { PutObjectCommandInput } from '@aws-sdk/client-s3'
import fileUpload from 'express-fileupload'
import { createFileService, getFilesService } from './archivos.service'
import { getTenantByIdService } from '@modules/tenants/tenants.service'
import config from '@config/config'
import { downloadFileFromS3, getFileSignedUrlFromS3Service, uploadFileToS3Service, uploadURLToS3Service } from '@modules/aws/aws.service'
import { HTTPError } from '@middlewares/error_handler'

export const getFilesController = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const files = await getFilesService()

    res.json(files)
  } catch (error) {
    next(error)
  }
}

/**
 * ? Funcion para obtener un archivo de AWS S3 (File)
 */
export const getFileBytesFromAWSController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const uuid = req.params.uuid
    const file = await downloadFileFromS3(uuid)

    res.setHeader('Content-Type', 'image/png')

    res.setHeader('Content-Disposition', `attachment; filename="${file.Key}"`)

    file.Body?.pipe(res)
  } catch (error) {
    console.error(error)
    next(error)
  }
}

/**
 * ? Funcion para obtener un archivo con un presigned URL de AWS S3 por el Tenant y el UUID del archivo
 */
export const getFilesFromAwsController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const folder = req.params.folder
    const fileName = req.params.fileName
    const path = `${folder}/${fileName}`

    const presignedFile = await getFileSignedUrlFromS3Service(path)

    res.json(presignedFile)
  } catch (error) {
    next(error)
  }
}

/**
 * ? Funcion para subir un archivo a AWS S3 (File)
 */
export const createFileController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { tenantId } = req.body

    const uuid = uuidv4()
    const file = req.files!.file as fileUpload.UploadedFile
    const fileName = file.name
    const fileExtension = path.extname(fileName)

    const getTenantUuid = await getTenantByIdService(tenantId)
    if (getTenantUuid == null) {
      throw new Error('Tenant no encontrado')
    }
    const awsFileName = `${uuid}${fileExtension}`
    const awsObjectKey = `${getTenantUuid?.nombre}/${awsFileName}`
    const awsBucket = config.AWS.BUCKET_NAME!
    const awsRegion = config.AWS.BUCKET_REGION!

    await uploadFileToS3Service(file, awsObjectKey)

    const newFile = await createFileService({
      uuid,
      nombreArchivo: fileName,
      awsObjectKey,
      awsBucket,
      awsRegion,
      tenantUuid: getTenantUuid.uuid
    })

    res.json(newFile)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

/**
 * ? Funcion para subir un archivo a AWS S3 usando un presigned URL
 */
export const createPresignedURLtoUploadFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { tenantId } = req.body
    const fileExtension: string = req.query.fileType?.toString() as string

    const uuid = uuidv4()
    const getTenantUuid = await getTenantByIdService(tenantId)

    if (getTenantUuid == null) {
      throw new HTTPError(404, 'Tenant no encontrado')
    }

    const Key = `${getTenantUuid.nombre}/${uuid}.${fileExtension}`

    let contentType
    if (['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'].includes(fileExtension)) {
      contentType = 'image/' + fileExtension
    } else if (['pdf'].includes(fileExtension)) {
      contentType = 'application/pdf'
    } else if (['doc', 'docx'].includes(fileExtension)) {
      contentType = 'application/msword'
    } else if (['xls', 'xlsx'].includes(fileExtension)) {
      contentType = 'application/vnd.ms-excel'
    } else {
      contentType = 'application/octet-stream'
    }

    const s3params: PutObjectCommandInput = {
      Bucket: config.AWS.BUCKET_NAME!,
      Key,
      Body: undefined,
      ContentType: contentType
    }

    const presignedURL = await uploadURLToS3Service(s3params)

    res.json({ presignedURL, key: Key, uuid })
  } catch (error) {
    console.log(error)

    next(error)
  }
}
