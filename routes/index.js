const express = require("express");
const router = express.Router();
const { pool, db } = require("../database");

let completeList = ["todo4"];

router.get("/", (req, res) => {
  db.any("SELECT todo FROM doing;")
    .then((todoList) => {
      console.log(todoList);
      res.render("pages/index", {
        todoList: todoList,
        completeList: completeList,
      });
    })
    .catch((err) => {
      res.render("pages/error", {
        err: err,
      });
    });
});

router.post("/addtodo", function (req, res) {
  let newTodo = req.body.newtodo;
  todoList.push(newTodo);
  console.log(todoList);
  res.redirect("/");
});

router.post("/removetodo", function (req, res) {
  let completeTodo = req.body.check;
  if (typeof completeTodo === "string") {
    completeList.push(completeTodo);
    todoList.splice(todoList.indexOf(completeTodo), 1);
  } else if (typeof completeTodo === "object") {
    for (var i = 0; i < completeTodo.length; i++) {
      completeList.push(completeTodo[i]);
      todoList.splice(todoList.indexOf(completeTodo[i]), 1);
    }
  }
  res.redirect("/");
});

module.exports = router;
