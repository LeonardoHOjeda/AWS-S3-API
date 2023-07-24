/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
// import { v4 as uuidv4 } from 'uuid'
import multer from 'multer'
import { createFileController, createMultipleFiles, createPresignedURLtoUploadFile, getFileBytesFromAWSController, getFilesController, getFilesFromAwsController } from './archivos.controller'

const router = Router()

// const storage = multer.diskStorage({
//   destination: (_req, _file, cb) => {
//     cb(null, 'uploads/')
//   },
//   filename: (_req, file, cb) => {
//     const { originalname } = file
//     cb(null, originalname)
//   }
// })

const storage = multer.memoryStorage()

// const fileFilter = (_req: any, file: any, cb: any) => {
//   if (file.mimetype.split('/')[0] === 'image' && file.mimetype.split('/')[1] === 'pdf') {
//     cb(null, true)
//   } else {
//     cb(new Error('El archivo no es del formato correcto.'), false)
//   }
// }
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
router.post('/uploadFile', uploader.single('file'), createFileController)

// ! Subir multiples archivos a AWS S3 y guardarlos en la BD (File)
router.post('/uploadMultipleFiles', uploader.array('file'), createMultipleFiles)
// Obtener un archivo de AWS S3 (File)
router.get('/:uuid', getFileBytesFromAWSController)

export default router
