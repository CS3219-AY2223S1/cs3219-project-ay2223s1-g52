const mongoose = require('mongoose')

const matchSchema = mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    room: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Match', matchSchema)
