import { Router } from 'express'
import { createTenant, getTenantById, getTenants, updateTenant } from './tenants.controller'

const router = Router()

router.get('/', getTenants)
router.post('/create', createTenant)
router.put('/update/:uuid', updateTenant)

// Dynamic Routes
router.get('/:uuid', getTenantById)

export default router
