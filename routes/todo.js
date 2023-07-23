const router = require("express").Router();
const Todo = require("../models/todo.js");
const { verifyTokenAuth } = require("./verifyToken");

//Create todo
router.post("/", verifyTokenAuth, async (req, res) => {
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

//Get user todo
router.get("/find/:id", verifyTokenAuth, async (req, res) => {
  try {
    console.log(req.params);
    const todo = await Todo.find({ user: req.params.id });

    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//Delete

router.delete("/delete-single/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json("Task has been deleted.");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//Delete done todo
router.delete("/delete-complete", async (req, res) => {
  try {
    await Todo.deleteMany({
      status: true,
    })
      .lean()
      .exec();
    res.status(200).json("All done tasks has been deleted.");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//update
router.put("/:id", async (req, res) => {
  try {
    console.log("click");
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
