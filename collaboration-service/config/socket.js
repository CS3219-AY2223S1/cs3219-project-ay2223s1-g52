const { Server } = require('socket.io')

const { redisClient } = require('./cache')

const connectSocket = (httpServer, options) => {
  const io = new Server(httpServer, options)

  io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('joinRoom', async ({ roomId, user }) => {
      if (!roomId) {
        socket.emit('error', { message: 'roomId is missing!' })
        return
      }

      const usersKey = `${roomId}:users`
      const listLen = await redisClient.lLen(usersKey)

      if (listLen >= 2) {
        socket.emit('error', {
          message: 'You cant join the room as it is already full!',
        })
        return
      }

      socket.join(roomId)
      socket.to(roomId).emit('userConnected', { user })

      // Handle users in room
      await redisClient.lPush(usersKey, user)

      const usersInRoom = await redisClient.lRange(usersKey, 0, -1)

      io.in(roomId).emit('usersInRoom', { usersInRoom })

      // Handle code
      const codeKey = `${roomId}:code`
      let code = await redisClient.get(codeKey)

      if (!code && code !== '') {
        await redisClient.set(codeKey, '')
        code = ''
      }

      socket.emit('codeUpdated', { code })
      await redisClient.hSet(socket.id, { roomId, user }) // For removal of user, when user disconnect
    })

    socket.on('disconnect', async () => {
      console.log('a user disconnected')

      const { roomId, user } = await redisClient.hGetAll(socket.id)
      if (roomId && user) {
        const key = `${roomId}:users`

        await redisClient.lRem(key, 0, user)

        const usersInRoom = await redisClient.lRange(key, 0, -1)

        if (!usersInRoom.length) {
          await redisClient.del(key)
        }

        io.in(roomId).emit('userDisconnect', { user })
        io.in(roomId).emit('usersInRoom', { usersInRoom })
      }
    })

    socket.on('codeChanged', async ({ code }) => {
      const { roomId } = await redisClient.hGetAll(socket.id)
      const codeKey = `${roomId}:code`

      await redisClient.set(codeKey, code)

      socket.to(roomId).emit('codeUpdated', { code })
    })
  })
}

module.exports = connectSocket
