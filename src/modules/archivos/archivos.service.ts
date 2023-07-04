import { Archivo, PrismaClient } from '@prisma/client'
// import fs from 'fs'

const prisma = new PrismaClient()

export async function getFilesService (): Promise<Archivo[]> {
  const getFiles = await prisma.archivo.findMany()

  return getFiles
}

export async function createFileService (data: Omit<Archivo, 'id' | 'createdAt'>): Promise<Archivo> {
  console.log('Data: ', data)
  // const stream = fs.createReadStream(file.tempFilePath)

  const createFile = await prisma.archivo.create({
    data: {
      uuid: data.uuid,
      nombreArchivo: data.nombreArchivo,
      awsObjectKey: data.awsObjectKey,
      awsBucket: data.awsBucket,
      awsRegion: data.awsRegion,
      tenantUuid: data.tenantUuid
    }
  })

  return createFile
}
