const express = require("express");
const { getUserDetails, postUserDetails, comparePass } = require("../controllers/user")

const router = express.Router();

/*
 * @route GET api/user
 * @description get details of user
 * @access loggedIn user  
*/
router.get("/", getUserDetails);

/*
 * @route POST api/user
 * @description update details of user
 * @access loggedIn user  
*/
router.post("/", postUserDetails);

module.exports = router;