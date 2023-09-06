import { HTTPError } from '@middlewares/error_handler'
import { Archivo } from '@prisma/client'
import { prisma } from '@database/prisma'
// import fs from 'fs'

class ArchivosService {
  async getFiles (): Promise<Archivo[]> {
    const files = await prisma.archivo.findMany({
      include: {
        tenant: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return files
  }

  async getFileByUuid (uuid: string): Promise<Archivo | null> {
    const file = await prisma.archivo.findFirst({
      where: { uuid }
    })

    if (file === null) {
      throw new HTTPError(404, 'No se encontró el archivo')
    }

    return file
  }

  async createFile (data: Omit<Archivo, 'id' | 'createdAt'>): Promise<Archivo> {
    const fileName = Buffer.from(data.nombreArchivo, 'latin1').toString('utf8')
    console.log('File name: ', fileName)

    const createFile = await prisma.archivo.create({
      data: {
        uuid: data.uuid,
        nombreArchivo: fileName,
        awsObjectKey: data.awsObjectKey,
        awsBucket: data.awsBucket,
        awsRegion: data.awsRegion,
        tenantUuid: data.tenantUuid
      }
    })

    return createFile
  }

  // TODO Eliminar archivo de AWS S3
  async deleteFile (uuid: string): Promise<Archivo> {
    const deleteFile = await prisma.archivo.delete({
      where: { uuid }
    })

    return deleteFile
  }
}

export const archivosService = new ArchivosService()
