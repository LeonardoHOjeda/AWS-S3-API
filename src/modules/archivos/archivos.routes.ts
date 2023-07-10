/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { createFileController, createPresignedURLtoUploadFile, getFileBytesFromAWSController, getFilesController, getFilesFromAwsController } from './archivos.controller'

const router = Router()

// Obtener todos los archivos de la BD
router.get('/', getFilesController)
// ? PRESIGNED URL
// Obtener un archivo de AWS S3 con presigned URL
router.get('/presignedFile/:folder/:fileName', getFilesFromAwsController)
// Subir un archivo a AWS S3 usando presigned URL
router.get('/uploadUrl', createPresignedURLtoUploadFile)
// ? FILES
// Subir archivos a AWS S3 y guardar en BD (File)
router.post('/uploadFile', createFileController)
// Obtener un archivo de AWS S3 (File)
router.get('/:uuid', getFileBytesFromAWSController)

export default router
