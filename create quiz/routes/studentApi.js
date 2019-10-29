var studentModel = require("../Models/Student");
var mongoose = require("mongoose");

function formatSessionId(sid) {
  return sid.split(".")[0].split(":")[1];
}

function createStudentApis(app) {
  app.post("/student/Login", async (req, resp) => {
    try {
      const { email } = req.body;
      const studentUser = new studentModel({
        _id: mongoose.Types.ObjectId(),
        email: email
      });
      await studentUser.save();
      req.session.user = studentUser;
      resp.json({ message: "logged in ..", user });
    } catch (err) {
      resp.json({ message: err });
    }
  });
  app.get("/student/getQuiz", async (req, resp) => {
    let RequestSessionIdFromUser = formatSessionId(req.cookies["connect.sid"]);
    let NodeSessionId = req.session.id;
    if (RequestSessionIdFromUser === NodeSessionId) {
      let userId = req.session.user._id;
      let user = await studentModel.findOne({ _id: userId });
      try {
        const { quizeId } = req.body;
        user.quizeId = quizeId;
        await user.save();
        resp.json(user.answers);
        resp.json({ message: "selected successfully" });
      } catch (err) {
        resp.json(err);
      }
    }
  });
  app.get("/student/answerQuiz", async (req, resp) => {
    let RequestSessionIdFromUser = formatSessionId(req.cookies["connect.sid"]);
    let NodeSessionId = req.session.id;
    if (RequestSessionIdFromUser === NodeSessionId) {
      let userId = req.session.user._id;
      let user = await studentModel.findOne({ _id: userId });
      try {
        const { answers } = req.body;
        user.answers = answers;
        await user.save();
        resp.json(user.answers);
        resp.json({ message: "submitted successfully" });
      } catch (err) {
        resp.json(err);
      }
    }
  });
}

module.exports = createStudentApis;
