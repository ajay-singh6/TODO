const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { expressjwt: expressJwt } = require("express-jwt");


// hasing the plain password
const hasedPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, 10);
};






// signup controller
const signUp = (req, res) => {
  const error = validationResult(req);
  console.log(error)
  if (!error.isEmpty()) {
    return res.status(422).json({
      msg: error.array()[0].msg,
=======
const comparePassword = (plainPassword, hash) => {
  return bcrypt.compareSync(plainPassword, hash);
};

// signup controller
const signUp = (req, res) => {
  const error = validationResult(req);
  console.log(error);
  if (!error.isEmpty()) {
    return res.status(422).json({
      msg: error.array()[0].msg,
      param: error.array()[0].param,

    });
  }

  const { name, email, password } = req.body;
  const hasedPass = hasedPassword(password);
  const user = new User({ name, email, password: hasedPass });
  user.save((err, user) => {
    if (!err) {

      return res.status(201).json({

        name: user.name,
        email: user.email,
        id: user._id,
      });
    } else {

      if (err.code == "11000") {
        return res.status(400).json({
          msg: "email already exists.",
        });
      }
      return res.status(500).json({
        msg: "Internal Error",
      });
    }
  });
};

// signin controller
const signIn = (req, res) => {





  const { email, password } = req.body;
  console.log(req.body);

  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).json({
      msg: error.array()[0].msg,
      param: error.array()[0].param,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      console.log(err, user, "hello");
      return res.status(400).json({
        msg: "Email address doesn't exist",
        param: "email",
      });
    }


    if (!comparePassword(password, user.password)) {
      return res.status(401).json({
        msg: "Invalid email or password",
        param: "password",
      });
    }

    const token = jwt.sign({ email: user.email }, process.env.SECRET);

    res.status(200).json({
      token,
      email: user.email,
      name: user.name,
    });
  });
};


const isSignedIn = expressJwt({
  secret: process.env.SECRET,
  requestProperty: "auth",
  algorithms: ["HS256"],

})



module.exports = { signIn, signUp, isSignedIn };
