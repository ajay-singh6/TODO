const express = require("express");
const { getUserDetails, updateUser } = require("../controllers/user")
const { authenticateToken } = require("../controllers/auth");
const router = express.Router();

/*
 * @route GET api/user
 * @description get details of user
 * @access loggedIn user  
*/
router.get("/", authenticateToken, getUserDetails);

/*
 * @route PUT api/user
 * @description update details of user
 * @access loggedIn user  
*/
router.put("/", authenticateToken, updateUser);

module.exports = router;