const todo = require("../models/todo");
const User = require("../models/user");

exports.getAllTodo = (req, res) => {
  todo
    .find({ "id": req.body.id })
    .then((todo) => res.json(todo))
    .catch((err) =>
      res.status(404).json({ message: "Todo not found", error: err.message })
    );
};

exports.createTodo = (req, res) => {
  console.log(req.body);
  
  todo
    .create(req.body)
    .then((data) => {
      User.findById({ id: req.body.userId }).then(user => {
        todos = user.todo.todos;
        todos.push(data.id);
        user.save();
        res.json({ message: "Todo added successfully", data })
      }).catch(err => {
        console.log(err);
        return res.status(400).json({ msg: "can't add" });
      })
    }).catch((err) => {
      //console.log(req.body);

      res
        .status(400)
        .json({ message: "Failed to add todo", error: err.message })
    });
}

exports.updateTodo = (req, res) => {
  todo
    .findOneAndUpdate({ $and: [{ id: req.params.id }, { email: req.body.email }] }, req.body)
    .then((data) => res.json({ message: "updated successfully", data }))
    .catch((err) =>
      res
        .status(400)
        .json({ message: "Failed to update todo", error: err.message })
    );
};

exports.deleteTodo = (req, res) => {
  todo
    .deleteOne({ id: req.params.id, email: req.body.email })
    .then((data) => {
      if (data.deletedCount == 1)
        res.status(201).json({ message: "todo deleted successfully", data });
      else
        res.status(404).json({ message: "book not found" });
    }).catch((err) =>
      res.status(404).json({ message: "book not found", error: err.message })
    );
};
