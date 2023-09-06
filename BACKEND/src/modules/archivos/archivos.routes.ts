/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import multer from 'multer'
import * as controller from './archivos.controller'

const router = Router()
const storage = multer.memoryStorage()
const uploader = multer({ storage })

router.get('/', controller.getFiles)
router.post('/', uploader.single('file'), controller.createFile)

router.post('/multi-upload', uploader.array('file'), controller.createMultipleFiles)
router.get('/create', controller.createFileWithPresignedUrl)

// Dynamic Routes
router.get('/:uuid', controller.getFileByUUID)
router.delete('/:uuid', controller.deleteFileController)
router.get('/aws/:uuid', controller.getFileBytesFromAWSController)

router.get('/presignedFile/:folder/:fileName', controller.getFileWithPresignedUrl)

export default router
