import { Archivo, PrismaClient } from '@prisma/client'
// import fs from 'fs'

const prisma = new PrismaClient()

// ? Obtener todos los archivos de la BD
export async function getFilesService (): Promise<Archivo[]> {
  const getFiles = await prisma.archivo.findMany()

  return getFiles
}

// ? Subir archivos a AWS S3 y guardar en BD (File)
export async function createFileService (data: Omit<Archivo, 'id' | 'createdAt'>): Promise<Archivo> {
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
