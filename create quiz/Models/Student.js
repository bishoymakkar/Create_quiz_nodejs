var mongoose = require("mongoose");

var studentModule = new mongoose.model(
  "Students",
  new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true },
    answers: [{ required: true }],
    quizeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quizes"
    }
  })
);

module.exports = studentModule;
