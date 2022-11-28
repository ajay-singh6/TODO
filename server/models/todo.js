const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: "String",
    required: true,
  },
  description: {
    type: "String",
  },
  isComplete: {
    type: "boolean",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, ref: "user", required: true,
  }
});

const todoModel = mongoose.model("todo", todoSchema);

module.exports = todoModel;
