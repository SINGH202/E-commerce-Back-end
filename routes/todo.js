const router = require("express").Router();
const Todo = require("../models/todo.js");

//Create todo
router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);

  try {
    const savedProduct = await newTodo.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//Get all Todo
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let todo;

    if (qNew) {
      todo = await Todo.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      todo = await Todo.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      todo = await Todo.find();
    }

    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
