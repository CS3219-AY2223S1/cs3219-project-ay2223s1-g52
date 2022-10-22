const express = require('express')
const cors = require('cors')
const { createServer } = require('http')
require('dotenv').config()

const { errorHandler } = require('./middleware/errorMiddleware')
const { connectCache } = require('./config/cache')
const connectSocket = require('./config/socket')

// Express
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({origin: 'https://frontend-rob2padjya-de.a.run.app'}))
app.options('*', cors())

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send({ message: 'Welcome to Collaboration Service!' })
})

// Error handling
app.use(errorHandler)

// Redis Cache
connectCache()

// HTTP Server
const httpServer = createServer(app)
const PORT = process.env.PORT || 8002

httpServer.listen(PORT, () => console.log(`listening on port ${PORT}`))

// Socket Server
connectSocket(httpServer, { cors: true })
