import { HTTPError } from '@middlewares/error_handler'
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

  if (singleFile === null) {
    throw new HTTPError(404, 'No se encontró el archivo')
  }

  return singleFile
}

// ? Subir archivos a AWS S3 y guardar en BD (File)
export async function createFileService (data: Omit<Archivo, 'id' | 'createdAt'>): Promise<Archivo> {
  console.log('Data fileeeee: ', data)
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

// ? Eliminar un archivo de la BD
export async function deleteFileService (uuid: string): Promise<Archivo> {
  const deleteFile = await prisma.archivo.delete({
    where: { uuid }
  })

  return deleteFile
}
