/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { createFileController, getFilesController, getFilesFromAwsController } from './archivos.controller'

const router = Router()

router.get('/', getFilesController)
router.get('/presignedFile/:fileName', getFilesFromAwsController)

router.post('/uploadFile', createFileController)

export default router
