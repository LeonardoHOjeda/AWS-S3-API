import { HTTPError } from '@middlewares/error_handler'
import { PrismaClient, Tenant } from '@prisma/client'

const prisma = new PrismaClient()

export async function getTenantsService (): Promise<Tenant[]> {
  const getTenants = await prisma.tenant.findMany()

  return getTenants
}

export async function getTenantByIdService (uuid: string): Promise<Tenant> {
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

export async function createTenantService (data: Omit<Tenant, 'id' | 'Archivo'>): Promise<Tenant> {
  const createTenant = await prisma.tenant.create({
    data
  })

  return createTenant
}

export async function updateTenant (uuid: string, data: Tenant): Promise<Tenant> {
  const updateTenant = await prisma.tenant.update({
    where: {
      uuid
    },
    data
  })

  return updateTenant
}