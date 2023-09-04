import { AwsFiles } from 'models/awsFiles.model'

class Helpers {
  compareDates = (dateOne: AwsFiles, dateTwo: AwsFiles): number => {
    const fechaA = new Date(dateOne.LastModified)
    const fechaB = new Date(dateTwo.LastModified)

    // Compara las fechas y devuelve el resultado de la comparación
    if (fechaA < fechaB) {
      return 1 // Si quieres ordenar de más antiguo a más reciente, cambia a -1
    } else if (fechaA > fechaB) {
      return -1 // Si quieres ordenar de más antiguo a más reciente, cambia a 1
    } else {
      return 0
    }
  }
}

export const helpers = new Helpers()
