const Problem = require('../model/problemModel')

const extractDifficulty = (roomId) => {
  const split = roomId.split('-')

  if (split.length < 3) {
    throw new Error('This is not a valid roomId')
  }

  return split[1]
}

function hash(str) {
  let hashCode = 0
  for (let i = 0, len = str.length; i < len; i++) {
    const chr = str.charCodeAt(i)
    // eslint-disable-next-line no-bitwise
    hashCode = (hashCode << 5) - hashCode + chr
    // eslint-disable-next-line no-bitwise
    hashCode |= 0 // Convert to 32bit integer
  }

  return Math.abs(hashCode) // The hash might overflow
}

const getRandomProblem = async (roomId, difficulty) => {
  const total = await Problem.countDocuments({ difficulty })
  const randomNumber = hash(roomId) % total
  const problem = await Problem.findOne().skip(randomNumber)

  return problem
}

module.exports = {
  extractDifficulty,
  getRandomProblem,
}
