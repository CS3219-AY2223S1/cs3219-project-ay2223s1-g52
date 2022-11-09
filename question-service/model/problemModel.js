const mongoose = require('mongoose')

const problemSchema = mongoose.Schema({
  questionId: {
    type: String,
  },
  questionFrontendId: {
    type: String,
  },
  title: {
    type: String,
  },
  titleSlug: {
    type: String,
    unique: true,
  },
  content: {
    type: String,
  },
  difficulty: {
    type: String,
    index: true,
  },
  likes: {
    type: Number,
  },
  dislikes: {
    type: Number,
  },
  similarQuestions: {
    type: String,
  },
  topicTags: {
    type: Array,
  },
  codeSnippets: {
    type: Array,
  },
  stats: {
    type: String,
  },
  hints: {
    type: [String],
  },
  sampleTestCase: {
    type: String,
  },
})

module.exports = mongoose.model('Problem', problemSchema)
