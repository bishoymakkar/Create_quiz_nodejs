var mongoose = require("mongoose");

var teacherModule = new mongoose.model(
  "Teachers",
  new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true },
    password: { type: String, required: true },
    quizesId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quizes"
      }
    ]
  })
);

module.exports = teacherModule;
