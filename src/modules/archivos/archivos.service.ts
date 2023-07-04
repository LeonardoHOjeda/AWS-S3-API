import { Archivo, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getFilesService (): Promise<Archivo[]> {
  const getFiles = await prisma.archivo.findMany()

  return getFiles
}

export async function createFileService (data: Omit<Archivo, 'id' | 'createdAt'>): Promise<Archivo> {
  const createFile = await prisma.archivo.create({
    data
  })

  return createFile
}
