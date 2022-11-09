const asyncHandler = require('express-async-handler')
const { LeetCode } = require('leetcode-query')

const Problem = require('../model/problemModel')
const {
  extractDifficulty,
  getRandomProblem,
} = require('../utils/questionHelper')

const leetcode = new LeetCode()

// Description: Get a random question for the room
// Route: GET /api/questionService/question/random/:roomId
// Access: Public
const getRandomQuestionOfDifficulty = asyncHandler(async (req, res) => {
  const { roomId } = req.params

  if (!roomId) {
    throw new Error('No roomId is given!')
  }

  const difficulty = extractDifficulty(roomId)
  const problem = await getRandomProblem(roomId, difficulty)

  res.status(200).json(problem)
})

// Description: Get a question with the specific title slug
// Route: GET /api/questionService/question/:titleSlug
// Access: Public
const getQuestion = asyncHandler(async (req, res) => {
  const { titleSlug } = req.params

  if (!titleSlug) {
    throw new Error('No titleSlug is given!')
  }

  const problem = await Problem.findOne({ titleSlug })

  res.status(200).json(problem)
})

// Description: Populate database with problems (nor for public use)
// Route: POST /api/questionService/question/test
// Access: Only in development by devs
const test = asyncHandler(async (req, res) => {
  const problemList = await leetcode.problems({ limit: 1 })
  const totalQuestions = 100 || problemList.total // TODO: change to other number later
  let offset = 0
  const limit = 10
  const problemTitlePromises = []

  while (offset < totalQuestions) {
    console.log('in while -->', offset)
    problemTitlePromises.push(leetcode.problems({ limit, offset }))
    offset += limit
  }

  const problemTitles = await Promise.all(problemTitlePromises)
  const problemPromises = []

  for (const problemTitle of problemTitles) {
    for (const question of problemTitle.questions) {
      if (!question.isPaidOnly) {
        console.log('slug -->', question.titleSlug)
        problemPromises.push(leetcode.problem(question.titleSlug))
      }
    }
  }

  console.log('done -->')
  const problems = await Promise.all(problemPromises)
  const newProblems = problems.map((problem) => ({
    questionId: problem.questionId,
    questionFrontendId: problem.questionFrontendId,
    title: problem.title,
    titleSlug: problem.titleSlug,
    content: problem.content,
    difficulty: problem.difficulty,
    likes: problem.likes,
    dislikes: problem.dislikes,
    similarQuestions: problem.similarQuestions,
    topicTags: problem.topicTags,
    codeSnippets: problem.codeSnippets,
    stats: problem.stats,
    hints: problem.hints,
    sampleTestCase: problem.sampleTestCase,
  }))

  await Problem.insertMany(newProblems)
  res.json({ message: `Done populating ${newProblems.length} questions` })
})

module.exports = {
  getRandomQuestionOfDifficulty,
  getQuestion,
  test,
}
