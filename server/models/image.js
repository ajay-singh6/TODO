const mongoose = require("mongoose");
const todoModel = require("./todo");

const imageSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
});

const imageModel = mongoose.model("ImageSchema", imageSchema);

module.exports = imageModel;