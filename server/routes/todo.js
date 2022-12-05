const express = require("express");
const router = express.Router();

const { authenticateToken, isSignedIn } = require("../controllers/auth");

const {
  getAllTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todo");

/**
 * @route GET api/todo
 * @description get all todo
 * @access public
 */
router.get("/", authenticateToken, getAllTodo);

/**
 * @route POST api/todo
 * @description add a new todo
 * @access public
 */
router.post("/", authenticateToken, createTodo);

/**
 * @route PUT api/todo/:id
 * @description update todo
 * @access public
 */
router.put("/:id", authenticateToken, updateTodo);

/**
 * @route DELETE api/todo/:id
 * @description delete todo
 * @access public
 */
router.delete("/:id", authenticateToken, deleteTodo);

module.exports = router;
