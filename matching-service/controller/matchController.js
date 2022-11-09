const asyncHandler = require('express-async-handler')
const { v4 } = require('uuid')

const Match = require('../model/matchModel')
const {
  STATUS_CODE_SUCCESS,
  STATUS_CODE_BAD_REQUEST,
} = require('../utils/constants')

const generateRoom = (difficulty) => `match-${difficulty}-${v4()}`

// Description: Create a match
// Route: POST /api/matchService/match
// Access: Private
const createMatch = asyncHandler(async (req, res) => {
  const { difficulty, user } = req.body

  // Check input
  if (!difficulty || !user) {
    res.status(STATUS_CODE_BAD_REQUEST)
    throw new Error('Please add all fields!')
  }

  // Check if user already waiting for a match
  const matchWithSameUserExists = await Match.findOne({ user })

  if (matchWithSameUserExists) {
    res.status(STATUS_CODE_BAD_REQUEST)
    throw new Error('Cannot have multiple waiting matches at the same time!')
  }

  // Find a match with same difficulty
  const match = await Match.findOne({ difficulty })

  if (match) {
    const { room } = match

    await match.remove()
    res.status(STATUS_CODE_SUCCESS).json({ room, isMatch: true })
  } else {
    const { id, room } = await Match.create({
      user,
      difficulty,
      room: generateRoom(difficulty),
    })

    res.status(STATUS_CODE_SUCCESS).json({ id, room, isMatch: false })
  }
})

const deleteMatchForSocket = async (socket) => {
  const promises = []

  for (const room of socket.rooms.values()) {
    const roomSplit = room.split('-')

    if (roomSplit[0] === 'match') {
      promises.push(Match.findOne({ room }))
    }
  }

  Promise.any(promises)
    .then((match) => {
      if (match) {
        match.remove()
      }
    })
    .catch((err) => console.log(err)) // Not sure why it still throws AggregateError even if there is one resolved promise
}

module.exports = {
  createMatch,
  deleteMatchForSocket,
}
