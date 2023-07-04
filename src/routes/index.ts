import Router from 'express'
import awsRouter from '@modules/aws/aws.routes'
import filesRouter from '@modules/archivos/archivos.routes'
import tenantsRouter from '@modules/tenants/tenants.routes'

const router = Router()

router.use('/api/aws', awsRouter)
router.use('/api/files', filesRouter)
router.use('/api/tenants', tenantsRouter)

export default router
