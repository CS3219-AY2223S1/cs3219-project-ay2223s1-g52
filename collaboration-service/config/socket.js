const { Server } = require('socket.io')

const { redisClient } = require('./cache')

const connectSocket = (httpServer, options) => {
  const io = new Server(httpServer, options)

  io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('joinRoom', async ({ roomId, user }) => {
      const key = `${roomId}:users`

      await redisClient.lPush(key, user)
      await redisClient.hSet(socket.id, { roomId, user }) // For removal of user, when user disconnect

      const usersInRoom = await redisClient.lRange(key, 0, -1)

      socket.join(roomId)
      io.in(roomId).emit('usersInRoom', { usersInRoom })
    })

    socket.on('disconnect', async () => {
      console.log('a user disconnected')

      const { roomId, user } = await redisClient.hGetAll(socket.id)
      const key = `${roomId}:users`

      await redisClient.lRem(key, 0, user)

      const usersInRoom = await redisClient.lRange(key, 0, -1)

      if (!usersInRoom.length) {
        await redisClient.del(key)
      }

      io.in(roomId).emit('userDisconnect', { user })
      io.in(roomId).emit('usersInRoom', { usersInRoom })
    })

    socket.on('codeChanged', async ({ code }) => {
      const { roomId } = await redisClient.hGetAll(socket.id)

      socket.to(roomId).emit('codeUpdated', { code })
    })
  })
}

module.exports = connectSocket
