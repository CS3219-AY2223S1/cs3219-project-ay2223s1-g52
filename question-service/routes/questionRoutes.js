const express = require('express')
const {
  getRandomQuestionOfDifficulty,
  test,
  getQuestion,
} = require('../controller/questionController')

const router = express.Router()

router.get('/random/:roomId', getRandomQuestionOfDifficulty)
router.get('/:titleSlug', getQuestion)
router.post('/test', test)

module.exports = router
