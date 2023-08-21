import { Router } from 'express'
import { createTenantController, getTenantById as getTenantByIdController, getTenantsController, updateTenant as updateTenantController } from './tenants.controller'

const router = Router()

router.get('/', getTenantsController)
router.get('/:uuid', getTenantByIdController)

router.post('/create', createTenantController)

router.put('/update/:uuid', updateTenantController)

export default router
