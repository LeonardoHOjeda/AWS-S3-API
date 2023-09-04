import { NextFunction, Request, Response } from 'express'
import { awsService } from './aws.service'
import { HTTPError } from '@middlewares/error_handler'

export const getFiles = async (_req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const result = await awsService.getFiles()

    res.json(result.Contents)
  } catch (error) {
    console.log('Error en GetFiles del modulo AWS: ', error)
    next(error)
  }
}

export const getSingleFile = async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
  const fileName = req.params.fileName
  const result = await awsService.getFileByName(fileName)

  res.json(result.$metadata)
}

export const uploadFile = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const file = req.file

    const maxSizeInBytes = 1 * 1024 * 1024 // 1 MB en bytes

    if (file!.size > maxSizeInBytes) {
      throw new HTTPError(400, 'El archivo es demasiado grande.')
    }

    console.log('Req file: ', req.file)

    const fileName = file!.originalname
    const awsObjectKey = `UploadedFiles/${fileName}`

    const newFile = await awsService.uploadFile(file!, awsObjectKey)

    res.json(newFile)
  } catch (error) {
    console.log('Error en uploadFile del modulo AWS: ', error)
    next(error)
  }
}

export const downloadFile = async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
  const fileName = req.params.fileName
  await awsService.downloadFile(fileName)

  res.json({ message: 'Archivo descargado' })
}

// ! Eliminar un archivo de AWS S3
export const deleteFile = async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
  const folder = req.params.folder
  const fileName = req.params.fileName
  const key = `${folder}/${fileName}`

  const result = await awsService.deleteFile(key)

  res.json(result)
}
