import express from 'express'
import path from 'path'

const port = 3030
const app = express()

const DIST_DIR = path.join(__dirname, '../client')
app.use(express.static(DIST_DIR))
app.get('*', (req, res) => { res.sendFile(path.join(DIST_DIR, 'index.html')) })
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`)
})
