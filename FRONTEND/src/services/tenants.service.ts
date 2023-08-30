import { Tenant } from '@/models/tenant.model'
import { instance } from '@/network/axios'

class TenantService {
  async fetchTenants(): Promise<Tenant[]> {
    const tenants = await instance.get('/tenants')

    return tenants.data
  }

  async createTenant(tenant: string): Promise<Tenant> {
    const tenantData = {
      nombre: tenant
    }
    const createdTenant = await instance.post('/tenants/create', tenantData)

    return createdTenant.data
  }

  async updateTenantById(uuid: number, tenant: Tenant): Promise<Tenant> {
    const updatedTenant = await instance.put(`/tenants/update/${uuid}`, tenant)

    return updatedTenant.data
  }
}

export const tenantService = new TenantService()
