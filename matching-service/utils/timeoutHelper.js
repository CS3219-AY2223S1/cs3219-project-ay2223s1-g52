const { deleteMatchForSocket } = require('../controller/matchController')

const timeoutTable = new Map()

const setRoomTimeout = (room, socket) => {
  const timeoutId = setTimeout(() => {
    deleteMatchForSocket(socket)
    socket.leave(room)
    socket.emit('failToMatch', {
      msg: "Sorry! We can't find a match at this time.",
    })
  }, 30000)
  timeoutTable.set(room, timeoutId)

  // automatic delete the entry in timeoutTable after 30 seconds is up with a 10 seconds delay
  setTimeout(() => {
    timeoutTable.delete(room)
  }, 40000)
}

const clearRoomTimeout = (room) => {
  clearTimeout(timeoutTable.get(room))
  timeoutTable.delete(room)
}

module.exports = {
  setRoomTimeout,
  clearRoomTimeout,
}
