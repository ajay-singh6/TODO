require("dotenv").config();
const express = require("express");
const cors = require("cors")
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const todoRoutes = require("./routes/todo");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const app = express();
connectDB();

const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};

//app.use(cookieParser());
app.use(express.json({ extended: false }));
app.use(cors(corsOptions));

app.get('/setcookie', (req, res) => {
  res.cookie(`Hrishabh`, `encrypted cookie string Value`);
  res.send('Cookie have been saved successfully');
});

app.get("/", (req, res) => {
  res.send("Server is up and running.");
});

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/api/todo", todoRoutes);
app.use("/api/user", userRoutes);
app.use("/api", authRoutes);

app.set("PORT", process.env.PORT || 8000);
const PORT = app.get("PORT");

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
