const { createClient } = require('redis')

let redisClient = null
if (process.env.ENV === 'PROD') {
  redisClient = createClient({
    socket: {
      host: process.env.REDIS_PROD_HOST,
      port: process.env.REDIS_PROD_PORT,
    },
    password: process.env.REDIS_PW,
  })
} else {
  redisClient = createClient({
    url: process.env.REDIS_DEV_URL || 'redis://localhost:6379',
  })
}

const connectCache = async () => {
  try {
    await redisClient.connect()
    await redisClient.flushAll() // TODO: need to check if this is correct in distributed system
    redisClient.on('error', console.error)
    console.log('Connected to redis locally!')
  } catch (error) {
    console.log('Error connecting to redis:', error)
  }
}

module.exports = { connectCache, redisClient }
