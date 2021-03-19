const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { task: todoList, complete: complete });
});

let todoList = ["todo1", "todo2", "todo3"];

router.post("/addtodo", function (req, res) {
  let newTodo = req.body.newtodo;
  todoList.push(newTodo);
  console.log(todoList);
  res.render("pages/home");
});

let completeList = ["todo4"];
router.post("/removetask", function (req, res) {
  let completeTodo = req.body.check;
  if (typeof completeTodo === "string") {
    complete.push(completeTodo);
    todoList.splice(todoList.indexOf(completeTodo), 1);
  } else if (typeof completeTodo === "object") {
    for (var i = 0; i < completeTodo.length; i++) {
      complete.push(completeTodo[i]);
      todoList.splice(todoList.indexOf(completeTodo[i]), 1);
    }
  }
  res.redirect("/");
});

module.exports = router;
