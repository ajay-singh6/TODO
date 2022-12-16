const express = require("express");
const { getUserDetails, updateUser, uploadImage } = require("../controllers/user")
const { authenticateToken } = require("../controllers/auth");
const router = express.Router();

router.use(authenticateToken);

/*
 * @route GET api/user
 * @description get details of user
 * @access loggedIn user  
*/
router.get("/:userId", getUserDetails);

/*
 * @route PUT api/user
 * @description update details of user
 * @access loggedIn user  
*/
router.put("/", authenticateToken, updateUser);

router.post("/upload", authenticateToken, uploadImage);

module.exports = router;