var teacherModel = require("../models/Teacher");
var quizModel = require("../Models/Quiz");
var mongoose = require("mongoose");

function formatSessionId(sid) {
  return sid.split(".")[0].split(":")[1];
}

function createTeacherApis(app) {
  app.post("/signin", async (req, resp) => {
    try {
      const { username, password } = req.body;
      let user = await teacherModel.findOne({ username, password });
      req.session.user = user;
      resp.json({ message: "logged in ..", user });
    } catch (err) {
      resp.json({ message: err });
    }
  });

  app.get("/signout", async (req, resp) => {
    await req.session.destroy();
    resp.json({ message: "signedout.." });
  });

  app.post("/createQuiz", async (req, resp) => {
    let RequestSessionIdFromUser = formatSessionId(req.cookies["connect.sid"]);
    let NodeSessionId = req.session.id;
    if (RequestSessionIdFromUser === NodeSessionId) {
      let userId = req.session.user._id;
      let user = await teacherModel.findOne({ _id: userId });
      try {
        let newQuiz = new quizModel({
          _id: mongoose.Types.ObjectId(),
          teacherId: req.session.user,
          entries: req.body.entries
        });

        user.quizesId = newQuiz._id;
        await user.save();
        await newQuiz.save();
        resp.json({ message: "Quiz created" });
        resp.json(newQuiz);
      } catch (err) {
        resp.json({ message: err });
      }
    }
  });
  app.get("/profile", async (req, resp) => {
    // let RequestSessionIdFromUser = formatSessionId(req.cookies["connect.sid"]);
    // let NodeSessionId = req.session.id;
    // if (RequestSessionIdFromUser === NodeSessionId) {
    //   let userId = req.session.user._id;
    //   let user = await teacherModel.findOne({ _id: userId }).populate('quizesId');
    //   resp.json({ user });
    // } else {
    //   resp.json({ message: "please login.." });
    // }
    let user = await teacherModel.findOne({ username:"admin" }).populate('quizesId');
     resp.json({ user });
  });
}

module.exports = createTeacherApis;
