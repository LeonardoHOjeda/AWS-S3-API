import Router from 'express'
import awsRouter from '@modules/aws/aws.routes'
import filesRouter from '@modules/archivos/archivos.routes'

const router = Router()

router.use('/api/aws', awsRouter)
router.use('/api/files', filesRouter)

export default router
