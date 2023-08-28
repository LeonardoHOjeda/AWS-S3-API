import { Tenant } from '@/models/tenant.model'
import { instance } from '@/network/axios'

class TenantService {
  async fetchTenants(): Promise<Tenant[]> {
    const tenants = await instance.get('/tenants')

    return tenants.data
  }
}

export const tenantService = new TenantService()
