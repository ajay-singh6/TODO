const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { signIn, signUp } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("Name should be atleast 3 character long."),
    check("email").isEmail().withMessage("Email is required."),
    check("password")
      .isLength({ min: 8 })
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/)
      .withMessage(
        "password must contain 8 charcter with one uppercase letter, one lowercase letter and one Number"
      ),
  ],
  signUp
);

router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("Email is required"),
    check("password").isLength({ min: 3 }).withMessage("password is required"),
  ],
  signIn
);

module.exports = router;
