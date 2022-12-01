const mongoose = require("mongoose");
const db = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
