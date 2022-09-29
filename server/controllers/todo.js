const todo = require("../models/todo");

exports.getAllTodo = (req, res) => {
  todo
    .find()
    .then((todo) => res.json(todo))
    .catch((err) =>
      res.status(404).json({ message: "Todo not found", error: err.message })
    );
};

exports.createTodo = (req, res) => {
  todo
    .create(req.body)
    .then((data) => res.json({ message: "Todo added successfully", data }))
    .catch((err) =>
      res
        .status(400)
        .json({ message: "Failed to add todo", error: err.message })
    );
};

exports.updateTodo = (req, res) => {
  todo
    .findByIdAndUpdate(req.params.id, req.body)
    .then((data) => res.json({ message: "updated successfully", data }))
    .catch((err) =>
      res
        .status(400)
        .json({ message: "Failed to update todo", error: err.message })
    );
};

exports.deleteTodo = (req, res) => {
  todo
    .findByIdAndRemove(req.params.id, req.body)
    .then((data) => res.json({ message: "todo deleted successfully", data }))
    .catch((err) =>
      res.status(404).json({ message: "book not found", error: err.message })
    );
};
