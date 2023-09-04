/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextFunction, Request, Response } from 'express'
import { downloadFileFromS3Service, getFilesFromS3Service, getSingleFileFromS3Service, deleteFileFromS3 } from './aws.service'
// import { HTTPError } from '@middlewares/error_handler'

export const getAllFiles = async (_req: Request, res: Response, _next: NextFunction): Promise<any> => {
  const result = await getFilesFromS3Service()

  res.json(result.Contents)
}

export const getSingleFile = async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
  const fileName = req.params.fileName
  const result = await getSingleFileFromS3Service(fileName)

  res.json(result.$metadata)
}

export const getSingleFileSignedUrl = async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
  const fileName = req.params.fileName
  const result = await getSingleFileFromS3Service(fileName)

  res.json(result.url)
}

export const downloadSingleFile = async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
  const fileName = req.params.fileName
  await downloadFileFromS3Service(fileName)

  res.json({ message: 'Archivo descargado' })
}

// ! Eliminar un archivo de AWS S3
export const deleteFile = async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
  const key = req.params.key
  const result = await deleteFileFromS3(key)

  res.json(result)
}
