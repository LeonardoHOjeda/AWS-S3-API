import { Router } from 'express'
import { createTenant, getTenantById, getTenants, updateTenant } from './tenants.controller'

const router = Router()

router.get('/', getTenants)
router.post('/', createTenant)

// Dynamic Routes
router.get('/:uuid', getTenantById)
router.put('/:uuid', updateTenant)

export default router
