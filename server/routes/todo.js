const express = require("express");
const router = express.Router();

const { authenticateToken, isSignedIn } = require("../controllers/auth");

const {
  getAllTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  pushTodoInUserArray,
} = require("../controllers/todo");
const { getUserById, isSignedIn, isAuthenticated } = require("../controllers/auth");


router.param("userId", getUserById)
/**
 * @route GET api/todo
 * @description get all todo
 * @access private
 */

router.get("/", authenticateToken, getAllTodo);

/**
 * @route POST api/todo
 * @description add a new todo
 * @access private
 */
router.post("/", authenticateToken, createTodo);

/**
 * @route PUT api/todo/:id
 * @description update todo
 * @access private
 */
router.put("/:id", authenticateToken, updateTodo);

/**
 * @route DELETE api/todo/:id
 * @description delete todo
 * @access private
 */

router.delete("/:id", authenticateToken, deleteTodo);

module.exports = router;
