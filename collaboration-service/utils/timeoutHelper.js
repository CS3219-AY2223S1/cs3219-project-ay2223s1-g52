const timerTable = new Map()
const intervalIdTable = new Map()

const clearRoomTimer = (roomId) => {
  const intervalId = intervalIdTable.get(roomId)
  clearInterval(intervalId)
  timerTable.delete(roomId)
  intervalIdTable.delete(roomId)
}

const emitTimer = (roomId) => {
  let timer = timerTable.get(roomId)

  if (timer > 0) {
    timer -= 1000
    timerTable.set(roomId, timer)
  }
}

const initTimer = (roomId) => {
  const intervalId = setInterval(() => {
    emitTimer(roomId)
  }, 1000)

  intervalIdTable.set(roomId, intervalId)
  // Start timer at 30 mins
  timerTable.set(roomId, 1800000)
}

const getRoomTimer = (roomId) => timerTable.get(roomId)

const setRoomTimer = (roomId) => {
  if (!intervalIdTable.get(roomId)) {
    initTimer(roomId)
  }
}

module.exports = {
  setRoomTimer,
  clearRoomTimer,
  getRoomTimer,
}
