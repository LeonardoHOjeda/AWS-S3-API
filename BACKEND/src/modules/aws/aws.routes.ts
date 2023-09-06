/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { deleteFile, downloadFile, getFiles, getSingleFile, uploadFile } from './aws.controller'
import multer from 'multer'

const router = Router()

const storage = multer.memoryStorage()
const uploader = multer({ storage })

router.get('/', getFiles)
router.post('/', uploader.single('file'), uploadFile)

// Dynamic Routes
router.get('/:folder/:fileName', getSingleFile)
router.delete('/:folder/:fileName', deleteFile)
router.get('/download/:folder/:fileName', downloadFile)

export default router
