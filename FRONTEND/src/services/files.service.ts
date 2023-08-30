import { FileDatabase } from '@/models/file.model'
import { instance } from '@/network/axios'

class FilesService {
  async getFilesFromDatabase(): Promise<FileDatabase[]> {
    const files = await instance.get('/files')

    return files.data
  }

  async deleteFileFromDatabase(uuid: string): Promise<void> {
    const file = await instance.delete(`/files/${uuid}`)

    return file.data
  }
}

export const filesService = new FilesService()
