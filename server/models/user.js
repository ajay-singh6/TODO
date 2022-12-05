const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        require: true
    },
    active: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: String,
        required: false,
    },
    todo: {
        todos: [
            {
                todoId: { type: mongoose.Schema.Types.ObjectId, ref: "todo", required: true },
                required: false
            }
        ]
    }
});


module.exports = mongoose.model("User", userSchema)