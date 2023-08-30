/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import multer from 'multer'
import { createSingleFile, createMultipleFiles, createPresignedURLtoUploadFile, getFileBytesFromAWSController, getFilesController, getFilesFromAwsController, getSingleDataFileByUUID } from './archivos.controller'

const router = Router()

const storage = multer.memoryStorage()
const uploader = multer({ storage })

// Obtener todos los archivos de la BD
router.get('/', getFilesController)
// ? PRESIGNED URL
// Obtener un archivo de AWS S3 con presigned URL
router.get('/presignedFile/:folder/:fileName', getFilesFromAwsController)
// Subir un archivo a AWS S3 usando presigned URL
router.get('/uploadUrl', createPresignedURLtoUploadFile)
// ? FILES
// Subir un solo archivo a AWS S3 y guardar en BD (File)
router.post('/uploadFile', uploader.single('file'), createSingleFile)

// ! Subir multiples archivos a AWS S3 y guardarlos en la BD (File)
router.post('/uploadMultipleFiles', uploader.array('file'), createMultipleFiles)
// Obtener un archivo de AWS S3 (File)
router.get('/:uuid', getFileBytesFromAWSController)
router.get('/single/:uuid', getSingleDataFileByUUID)

export default router
