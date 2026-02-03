const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  loveScale: Number,
  girlfriendWord: String,
  kissesPerDay: String,
  dateAnswer: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Answer", AnswerSchema);
