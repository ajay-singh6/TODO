const express = require("express");
const router = express.Router();
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
router.get("/:userId", getAllTodo);

/**
 * @route POST api/todo
 * @description add a new todo
 * @access private
 */
router.post("/:userId", isSignedIn, isAuthenticated,  createTodo);

/**
 * @route PUT api/todo/:id
 * @description update todo
 * @access private
 */
router.put("/:userId/:id", isSignedIn, isAuthenticated, updateTodo);

/**
 * @route DELETE api/todo/:id
 * @description delete todo
 * @access private
 */
router.delete("/:userId/:id",isSignedIn, isAuthenticated, deleteTodo);

module.exports = router;
