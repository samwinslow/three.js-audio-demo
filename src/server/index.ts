import express from 'express'
import path from 'path'
import http from 'http'

const port = 3030

class App {
  private server: http.Server
  private port: number

  constructor(port: number) {
    this.port = port
    const DIST_DIR = path.join(__dirname, '../client')
    const app = express()
    app.use(express.static(DIST_DIR))
    app.get('*', (req, res) => {
      res.sendFile(path.join(DIST_DIR, 'index.html'))
  })
    this.server = new http.Server(app)
  }

  public Start() {
    this.server.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}.`)
    })
  }
}

new App(port).Start()
