import { FileDatabase } from '@/models/file.model'
import { instance } from '@/network/axios'

class FilesService {
  async getFilesFromDatabase(): Promise<FileDatabase[]> {
    const files = await instance.get('/files')

    return files.data
  }
}

export const filesService = new FilesService()
