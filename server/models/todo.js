const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: "String",
    required: true,
  },
  description: {
    type: "String",
  },
});

const todoModel = mongoose.model("todo", todoSchema);

module.exports = todoModel;
