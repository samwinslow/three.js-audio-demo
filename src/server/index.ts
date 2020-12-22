import express from 'express'
import path from 'path'
import webpack from 'webpack'
import * as webpackDevMiddleware from 'webpack-dev-middleware'
import * as webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../../webpack.config.js'

const port = 3030
const app = express()

const devServerEnabled = true

if (devServerEnabled) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
  const compiler = webpack(config)
  app.use(webpackDevMiddleware(compiler))
  app.use(webpackHotMiddleware(compiler))
}

const DIST_DIR = path.join(__dirname, '../client')
app.use(express.static(DIST_DIR))
app.get('*', (req, res) => { res.sendFile(path.join(DIST_DIR, 'index.html')) })
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`)
})
