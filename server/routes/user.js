const express = require("express");
const { getUserDetails, postUserDetails, getUserById } = require("../controllers/user")

const router = express.Router();

router.param("userId", getUserById)

/*
 * @route GET api/user
 * @description get details of user
 * @access loggedIn user  
*/
router.get("/:userId", getUserDetails);

/*
 * @route POST api/user
 * @description update details of user
 * @access loggedIn user  
*/
router.post("/", postUserDetails);

module.exports = router;