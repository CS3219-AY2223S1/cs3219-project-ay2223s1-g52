const { Server } = require('socket.io')

const { redisClient } = require('./cache')
const {
  setRoomTimer,
  clearRoomTimer,
  getRoomTimer,
} = require('../utils/timeoutHelper')

const getNewLines = (noOfLines) => {
  let newLines = ''
  for (let i = 1; i < noOfLines; i++) {
    newLines += '\n'
  }
  return newLines
}

const DEFAULT_CODE = '# Enter your answer here'

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
          message: "You can't join the room as it is already full!",
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
        code = DEFAULT_CODE + getNewLines(20)
        await redisClient.set(codeKey, code)
      }

      io.in(roomId).emit('initialCode', { code })
      await redisClient.hSet(socket.id, { roomId, user }) // For removal of user, when user disconnect
      // Handle 30 minutes timer
      setRoomTimer(roomId)
      // Emit current time to client
      socket.emit('currentTime', { timer: getRoomTimer(roomId) })
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
          console.log('Room deleted')
          // Housekeeping matter of timeout
          clearRoomTimer(roomId)
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
