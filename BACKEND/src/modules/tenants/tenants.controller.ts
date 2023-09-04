import { NextFunction, Request, Response } from 'express'
import { tenantsService } from './tenants.service'
import shortUUID from 'short-uuid'

export const getTenants = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const tenants = await tenantsService.getTenants()

    res.json(tenants)
  } catch (error) {
    next(error)
  }
}

export const getTenantById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { uuid } = req.params

    const tenant = await tenantsService.getTenantByUuid(uuid)

    res.json(tenant)
  } catch (error) {
    console.log('Error en getTenantById: ', error)
    next(error)
  }
}

export const createTenant = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const uuid = shortUUID.generate()

    const { nombre } = req.body
    const newTenant = await tenantsService.createTenant({
      uuid,
      nombre,
      presignedURLTime: 3000
    })

    res.json(newTenant)
  } catch (error) {
    next(error)
  }
}

export const updateTenant = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const uuid = req.params.uuid
    const tenantData = req.body

    console.log('Tenant data: ', tenantData)

    const updatedTenant = await tenantsService.updateTenant(uuid, tenantData)

    res.json(updatedTenant)
  } catch (error) {
    console.log('Error en updateTenant: ', error)
    next(error)
  }
}
