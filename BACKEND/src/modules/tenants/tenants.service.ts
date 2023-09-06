import { HTTPError } from '@middlewares/error_handler'
import { Tenant } from '@prisma/client'
import { prisma } from '@database/prisma'

class TenantsService {
  async getTenants (): Promise<Tenant[]> {
    const getTenants = await prisma.tenant.findMany()

    return getTenants
  }

  async getTenantByUuid (uuid: string): Promise<Tenant> {
    const getTenantById = await prisma.tenant.findUnique({
      where: {
        uuid
      }
    })

    if (getTenantById === null) {
      throw new HTTPError(404, 'Tenant no encontrado (AWS)')
    }

    return getTenantById
  }

  async createTenant (data: Omit<Tenant, 'id' | 'Archivo'>): Promise<Tenant> {
    const createTenant = await prisma.tenant.create({
      data
    })

    return createTenant
  }

  async updateTenant (uuid: string, data: Tenant): Promise<Tenant> {
    const updateTenant = await prisma.tenant.update({
      where: {
        uuid
      },
      data
    })

    if (updateTenant === null) {
      throw new HTTPError(404, 'Tenant no encontrado (AWS)')
    }

    return updateTenant
  }
}

export const tenantsService = new TenantsService()
