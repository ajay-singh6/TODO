require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const todoRoutes = require("./routes/todo");

const app = express();
connectDB();

app.use(express.json({ extended: false }));
app.get("/", (req, res) => {
  res.send("Server is up and running.");
});

app.use("/api/todo", todoRoutes);

app.set("PORT", process.env.PORT || 8000);
const PORT = app.get("PORT");

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
