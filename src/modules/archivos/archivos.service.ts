import { Archivo, PrismaClient } from '@prisma/client'
// import fs from 'fs'

const prisma = new PrismaClient()

// ? Obtener todos los archivos de la BD
export async function getFilesService (): Promise<Archivo[]> {
  const getFiles = await prisma.archivo.findMany()

  return getFiles
}

// ? Obtener un solo archivo de la BD por el UUID
export async function getSingleFileService (uuid: string): Promise<Archivo | null> {
  const singleFile = await prisma.archivo.findFirst({
    where: { uuid }
  })

  return singleFile
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
