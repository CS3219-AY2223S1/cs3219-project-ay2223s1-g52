const asyncHandler = require('express-async-handler')

const History = require('../model/historyModel')

// Description: Get histories of a user
// Route: GET /api/historyService/history/:username
// Access: Public
const getHistory = asyncHandler(async (req, res) => {
  const { username } = req.params

  if (!username) {
    throw new Error('No userId is given!')
  }

  const history = await History.find({ username })

  if (history.length == 0) {
    res.status(400).json({
      message: 'No history for such username found!',
    })
  }

  res.status(200).json(history)
})

// Description: Add a history for a user
// Route: POST /api/historyService/history/:username
// Access: Public
const addHistory = asyncHandler(async (req, res) => {
  const { username } = req.params
  const { title, titleSlug } = req.body

  if (!username) {
    throw new Error('No userId is given!')
  }

  if (!title || !titleSlug) {
    throw new Error('Question Name or Question Slug is missing')
  }

  const history = await History.create({
    username,
    title,
    titleSlug,
  })

  res.status(200).json({
    message: 'History created successfully',
    history,
  })
})

module.exports = {
  getHistory,
  addHistory,
}
