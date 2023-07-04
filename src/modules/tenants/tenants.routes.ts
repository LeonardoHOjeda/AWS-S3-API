import { Router } from 'express'
import { createTenantController, getTenantsController } from './tenants.controller'

const router = Router()

router.get('/', getTenantsController)

router.post('/create', createTenantController)

export default router
