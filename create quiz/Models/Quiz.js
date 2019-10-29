var mongoose = require("mongoose");

var QuizModule = new mongoose.model(
  "Quizes",
  new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name : String,
    entries: [{}],
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teachers"
    },
    studentId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Students"
      }
    ]
  })
);

module.exports = QuizModule;
