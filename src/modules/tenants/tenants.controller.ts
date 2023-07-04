import { NextFunction, Request, Response } from 'express'
import { createTenantService, getTenantsService } from './tenants.service'
import shortUUID from 'short-uuid'

export const getTenantsController = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const tenants = await getTenantsService()

    res.json(tenants)
  } catch (error) {
    next(error)
  }
}

export const createTenantController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const uuid = shortUUID.generate()

    const { nombre } = req.body
    const newTenant = await createTenantService({
      uuid,
      nombre
    })

    res.json(newTenant)
  } catch (error) {
    next(error)
  }
}
