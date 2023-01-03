const express = require("express");
const { getUserDetails, updateUser, uploadImage, changePassword } = require("../controllers/user")
const { authenticateToken } = require("../controllers/auth");
const router = express.Router();

router.use(authenticateToken);

/*
 * @route GET api/user
 * @description get details of user
 * @access private 
*/
router.get("/", getUserDetails);

/*
 * @route PUT api/user
 * @description update details of user
 * @access private  
*/


/*
 * @route POST api/user/change-password
 * @description change loggedIn user's password
 * @access private  
*/
router.put("/change-password", changePassword);

router.put("/", updateUser);

/*
 * @route POST api/user/upload-user-image
 * @description upload image of user
 * @access private  
*/
router.post("/upload", uploadImage);

module.exports = router;