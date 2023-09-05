import { instance } from '@/network/axios'

class AwsService {
  async getFilesFromAws(): Promise<any[]> {
    const awsFiles = await instance.get('/aws')

    return awsFiles.data
  }
}

export const awsService = new AwsService()
