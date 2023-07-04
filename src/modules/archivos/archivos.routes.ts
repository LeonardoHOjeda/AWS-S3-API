/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { createFileController, getFilesController } from './archivos.controller'

const router = Router()

router.get('/', getFilesController)
router.post('/uploadFile', createFileController)

export default router
