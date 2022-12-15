const Todo = require("../models/todo");
const User = require("../models/user");

exports.getAllTodo = (req, res) => {

  Todo.find({ userId: req.body.id })
    .populate("userId", "name email")
    .then((todo) => {

      res.json(todo);
    })
    .catch((err) =>
      res.status(404).json({ message: "Todo not found", error: err.message })
    );
};

exports.createTodo = (req, res) => {

  const { id, title, description, color } = req.body;
  Todo.create({ title, description, color, userId: id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(400)
        .json({ message: "Failed to add todo", error: err.message });
    });
};

exports.updateTodo = (req, res) => {

  Todo
    .findOneAndUpdate({ "_id": req.params.id, "userId": req.body.id }, req.body)
    .then((data) => res.json({ message: "updated successfully", data }))
    .catch((err) =>
      res
        .status(400)
        .json({ message: "Failed to update todo", error: err.message })
    );
};




exports.deleteTodo = (req, res) => {

  console.log(req.body.id);
  console.log(req.params.id);

  Todo
    .findOneAndDelete({ "_id": req.params.id, "userId": req.body.id })
    .then((data) => {
      console.log(data);
      //if (data.deletedCount == 1)
        res.status(201).json({ message: "todo deleted successfully", data });
      //else
        //res.status(404).json({ message: "todo not found" });
    }).catch((err) =>
      res.status(404).json({ message: "todo not found", error: err.message })
    );
};