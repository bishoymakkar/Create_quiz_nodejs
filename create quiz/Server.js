var express = require("express");
var app = express();
var mongoose = require("mongoose");
var session = require("express-session");
var uuid = require("uuid/v4");
var cookieParser = require("cookie-parser");
var teacherApi = require("./routes/teacherApi");
var TeacherModel = require('./models/Teacher');
mongoose.connect("mongodb://localhost:27017/quizDb");

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    genid: uuid,
    cookie: { maxAge: 10000000000 },
    secret: "secret"
  })
);

teacherApi(app);
app.get("/", (req, resp) => {
  resp.send("server is running...");
});

/////////create teacher account
const teacheruser = new TeacherModel({
    _id: mongoose.Types.ObjectId(),
    username: "admin",
    password: "admin"
});
teacheruser.save()

app.listen(8085);
