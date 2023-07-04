/* eslint-disable @typescript-eslint/naming-convention */
import { NextFunction, Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { createFileService, getFilesService } from './archivos.service'

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
    const uuid = uuidv4()
    const { nombreArchivo, awsObjectKey, awsBucket, awsRegion, tenantId } = req.body

    const newFile = await createFileService({
      uuid,
      nombreArchivo,
      awsObjectKey,
      awsBucket,
      awsRegion,
      tenantId
    })

    res.json(newFile)
  } catch (error) {
    next(error)
  }
}
