/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { NextFunction, Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import { createFileService, getFilesService } from './archivos.service'
import { getTenantByIdService } from '@modules/tenants/tenants.service'
import config from '@config/config'
import fileUpload from 'express-fileupload'
import { uploadFileToS3Service } from '@modules/aws/aws.service'
// import { uploadFileToS3Service } from '@modules/aws/aws.service'

export const getFilesController = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const files = await getFilesService()

    res.json(files)
  } catch (error) {
    next(error)
  }
}

export const createFileController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { tenantId } = req.body

    const uuid = uuidv4()
    const file = req.files!.file as fileUpload.UploadedFile
    const fileName = file.name
    const fileExtension = path.extname(fileName)
    const awsFileName = `${uuid}${fileExtension}`

    const getTenantUuid = await getTenantByIdService(tenantId)
    if (getTenantUuid == null) {
      throw new Error('Tenant no encontrado')
    }
    const awsObjectKey = `${getTenantUuid?.nombre}/${awsFileName}`
    const awsBucket = config.AWS.BUCKET_NAME!
    const awsRegion = config.AWS.BUCKET_REGION!

    await uploadFileToS3Service(file, awsFileName)

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
