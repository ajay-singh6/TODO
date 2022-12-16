const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: "String",
    required: true,
  },
  description: {
    type: "String",
  },
  color: "String",
  isComplete: {
    type: "boolean",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
<<<<<<< HEAD
    ref: "User", 
    required: true,
  }
=======
    ref: "User",
    required: true,
  },
>>>>>>> devlopment
});

const todoModel = mongoose.model("Todo", todoSchema);

module.exports = todoModel;
