const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { createServer } = require('http')

const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const connectSocket = require('./config/socket')

// Express
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

// Routes
app.get('/', (req, res) => {
  res.send('Hello World from matching-service')
})
app.use('/api/matchService/match', require('./routes/matchRoutes'))

// Error handling
app.use(errorHandler)

// HTTP server
const httpServer = createServer(app)
const PORT = process.env.PORT || 8001

async function start() {
  await connectDB()
  httpServer.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
  })
  connectSocket(httpServer, { cors: true })
}

start()

// For testing purposes
module.exports = httpServer
