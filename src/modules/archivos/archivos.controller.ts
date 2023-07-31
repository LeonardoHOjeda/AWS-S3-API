/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { NextFunction, Request, Response, RequestHandler } from 'express'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import { PutObjectCommandInput } from '@aws-sdk/client-s3'
// import fileUpload from 'express-fileupload'
import { createFileService, getFilesService, getSingleFileService } from './archivos.service'
// import { getFilesService } from './archivos.service'
import { getTenantByIdService } from '@modules/tenants/tenants.service'
import config from '@config/config'
import { downloadFileFromS3, getFileSignedUrlFromS3Service, uploadFileToS3Service, uploadMultipleFilesToS3, uploadURLToS3Service } from '@modules/aws/aws.service'
import { HTTPError } from '@middlewares/error_handler'
// import { downloadFileFromS3, getFileSignedUrlFromS3Service, uploadMultipleFilesToS3, uploadURLToS3Service } from '@modules/aws/aws.service'

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

    res.setHeader('Content-Type', file.ContentType)
    res.setHeader('Content-Disposition', `attachment; filename="${file.Key}"`)

    file.Body?.pipe(res)
  } catch (error) {
    console.error(error)
    next(error)
  }
}

export const getSingleDataFileByUUID = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const uuid = req.params.uuid
    const fileData = await getSingleFileService(uuid)

    res.json(fileData)
  } catch (error) {
    console.error('Error en getSingleFileByUUID: ', error)
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
export const createSingleFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { tenantId } = req.body
    const uuid = uuidv4()
    const file = req.file

    const maxSizeInBytes = 1 * 1024 * 1024 // 1 MB en bytes

    if (file!.size > maxSizeInBytes) {
      throw new HTTPError(400, 'El archivo es demasiado grande.')
    }

    console.log('Req file: ', req.file)

    const allowedExtensions = ['.png', '.pdf', '.jpg', '.jpeg', '.gif']
    const fileExtension = path.extname(file!.originalname)

    if (!allowedExtensions.includes(fileExtension)) {
      throw new HTTPError(400, 'El archivo tiene una extensión no permitida.')
    }

    console.log('Files: ', file)

    const tenant = await getTenantByIdService(tenantId)

    const awsFileName = `${uuid}${fileExtension}`
    const awsObjectKey = `${tenant.nombre}/${awsFileName}`
    const awsBucket = config.AWS.BUCKET_NAME!
    const awsRegion = config.AWS.BUCKET_REGION!

    await uploadFileToS3Service(file!, awsObjectKey)

    const newFile = await createFileService({
      uuid,
      nombreArchivo: file!.originalname,
      awsObjectKey,
      awsBucket,
      awsRegion,
      tenantUuid: tenant.uuid
    })

    res.json(newFile)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const createMultipleFiles: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { tenantId } = req.body
    const files = req.files as unknown as Express.Multer.File[]

    const tenant = await getTenantByIdService(tenantId)

    // Generar el nombre del archivo
    const resultados: any[] = []

    await Promise.all(files.map(async (file) => {
      console.log('File: ', file)

      const uuid = uuidv4()
      const fileName = file.originalname

      // Subir informacion del archivo a la base de datos
      await createFileService({
        uuid,
        nombreArchivo: fileName,
        awsObjectKey: `${tenant.nombre}/${uuid}`,
        awsBucket: config.AWS.BUCKET_NAME!,
        awsRegion: config.AWS.BUCKET_REGION!,
        tenantUuid: tenant.uuid
      })

      // Subir el archivo a AWS
      const result = await uploadMultipleFilesToS3(file, tenant.nombre, uuid)

      console.log('Processed file: ', fileName)

      // Agregar el resultado al arreglo de resultados
      resultados.push(result)
    }))

    res.json(resultados)
    // res.status(200).json({ message: 'Archivos procesados correctamente' })
  } catch (error) {
    console.log('Error en createFile: ', error)
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
    const tenant = await getTenantByIdService(tenantId)

    const Key = `${tenant.nombre}/${uuid}.${fileExtension}`

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

    const presignedURL = await uploadURLToS3Service(tenant, s3params)

    res.json({ presignedURL, key: Key, uuid })
  } catch (error) {
    console.log(error)

    next(error)
  }
}
