/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { downloadSingleFile, getFiles, getSingleFile, uploadFile } from './aws.controller'
import multer from 'multer'

const router = Router()

const storage = multer.memoryStorage()
const uploader = multer({ storage })

router.get('/files', getFiles)
router.post('/files', uploader.single('file'), uploadFile)
router.get('/files/:fileName', getSingleFile)
router.get('/files/download/:fileName', downloadSingleFile)

export default router
