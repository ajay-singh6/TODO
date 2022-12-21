const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../controllers/auth");

const {
  getAllTodo,
  createTodo,
  updateTodo,
  deleteTodo
} = require("../controllers/todo");

router.use(authenticateToken);

/**
 * @route GET api/todo
 * @description get all todo
 * @access private
 */
router.get("/", getAllTodo);

/**
 * @route POST api/todo
 * @description add a new todo
 * @access private
 */
router.post("/", createTodo);

/**
 * @route PUT api/todo/:id
 * @description update todo
 * @access private
 */
router.put("/:id", updateTodo);

/**
 * @route DELETE api/todo/:id
 * @description delete todo
 * @access private
 */
router.delete("/:id", deleteTodo);

module.exports = router;
