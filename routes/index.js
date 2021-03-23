const express = require("express");
const router = express.Router();
const { pool, db } = require("../database");
const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window);

router.get("/", async (req, res) => {
  try {
    let todoList = await db.any("SELECT todo FROM doing;");
    let completeList = await db.any("SELECT complete FROM completed;");
    res.render("pages/index", {
      todoList: todoList,
      completeList: completeList,
    });
  } catch (err) {
    console.log(err);
    res.render("pages/error", {
      err: err,
    });
  }
});

router.post("/addtodo", (req, res) => {
  let newTodo = req.body.newtodo;
  console.log(newTodo);
  db.none("INSERT INTO doing(todo) VALUES ($1);", [newTodo])
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      res.render("pages/error", {
        err: err,
      });
    });
});

router.post("/movetodo", (req, res) => {
  let completeTodo = req.body.check;
  if (typeof completeTodo === "string")
    db.any("INSERT INTO completed(complete) VALUES($1);", [completeTodo])
      .then(() => {
        let moveTodo = req.body.check;
        db.none("DELETE FROM doing WHERE todo = $1;", [moveTodo]);
      })
      .catch((err) => {
        res.render("pages/error", {
          err: err,
        });
      });
  else if (typeof completeTodo === "object") {
    for (let i = 0; i < completeTodo.length; i++) {
      db.any("INSERT INTO completed(complete) VALUES($1);", [completeTodo[i]])
        .then(() => {
          let moveTodo = req.body.check;
          console.log(moveTodo);
          for (let i = 0; i < moveTodo.length; i++) {
            db.none("DELETE FROM doing WHERE todo = $1", moveTodo[i]);
          }
        })
        .then(() => {
          console.log("Moved item");
        })
        .catch((err) => {
          res.render("pages/error", {
            err: err,
          });
        });
    }
  }
  return res.redirect("/");
});

// need condition to handle empty delete
router.post("/deletetodo", (req, res) => {
  let deleteTodo = req.body.complete;
  if (typeof deleteTodo === "undefined") console.log("this is", deleteTodo);
  else if (typeof deleteTodo === "string")
    db.none("DELETE FROM completed WHERE complete = $1;", [deleteTodo])
      .then(() => {
        res.redirect("/");
      })
      .catch((err) => {
        res.render("pages/error", {
          err: err,
        });
      });
  else if (typeof deleteTodo === "object") {
    for (let i = 0; i < deleteTodo.length; i++) {
      db.none("DELETE FROM completed WHERE complete = $1", deleteTodo[i])
        .then(() => {
          console.log("Removed item");
        })
        .catch((err) => {
          res.render("pages/error", {
            err: err,
          });
        });
    }
    res.redirect("/");
  }
});

module.exports = router;
