var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/tododb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

var todoSchema = new mongoose.Schema({
  name: String,
});

var Todo = mongoose.model("Todo", todoSchema);

//Express Routes
app.get("/", function (req, res) {
  Todo.find({}, function (err, todoList) {
    if (err) console.log(err);
    else {
      res.render("index", { todoList: todoList });
    }
  });
});

app.post("/newtodo", function (req, res) {
  var newItem = new Todo({
    name: req.body.item,
  });
  Todo.create(newItem, function (err, Todo) {
    if (err) console.log(err);
    else {
      console.log("Inserted Item: " + newItem);
    }
  });
  res.redirect("/");
});

app.get("*", function (req, res) {
  res.send("INVALID PAGE");
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("RUNNING NOW");
});
