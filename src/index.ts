import './alias'
import express, { Application } from 'express'
import config from './config/config'
import router from './routes'
import { handleErrorMiddleware } from '@middlewares/error_handler'
import fileUpload from 'express-fileupload'

class Server {
  private readonly app: Application
  private readonly port: string

  constructor () {
    this.app = express()
    this.port = config.PORT

    this.middlewares()
    this.routes()
  }

  start (): void {
    this.app.listen(this.port, () => {
      console.log('🚀 Servidor corriendo en el puerto: ', this.port)
    })
  }

  // Rutas
  routes () {
    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: './uploads'
      // debug: false
    }))
    this.app.use(router)
    this.app.use(handleErrorMiddleware)
  }

  // Middlewares
  middlewares (): void {
    this.app.use(express.json())
    this.app.use((_req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
      next()
    })
  }
}

const server = new Server()
server.start()
