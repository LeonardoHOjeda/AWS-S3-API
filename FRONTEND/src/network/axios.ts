/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios, { AxiosError } from 'axios'

const handleServerError = (error: AxiosError<any, any>): AxiosError => {
  console.log('Error Axios: ', error.response)

  if (error.response?.status === 500) {
    const errorMessage =
      error.response?.data?.message || 'Ocurrió un error en el servidor'
    console.log('Error en handleServerError: ', errorMessage)
  }

  throw error
}

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`
})

instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any, any>) => {
    if (error.code === 'ERR_NETWORK') {
      // toast.error('No hay conexión a internet')
    } else {
      handleServerError(error)
    }
  }
)

export { instance }
