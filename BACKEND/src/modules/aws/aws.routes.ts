/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { deleteFile, downloadFile, getFiles, getSingleFile, uploadFile } from './aws.controller'
import multer from 'multer'

const router = Router()

const storage = multer.memoryStorage()
const uploader = multer({ storage })

router.get('/files', getFiles)
router.post('/files', uploader.single('file'), uploadFile)
router.get('/files/:folder/:fileName', getSingleFile)
router.delete('/files/:folder/:fileName', deleteFile)
router.get('/files/download/:folder/:fileName', downloadFile)

export default router
