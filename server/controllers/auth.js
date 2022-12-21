require("dotenv").config();

const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { expressjwt: expressJwt } = require("express-jwt");

const sendOtp = require("../utils/nodemailer");

// hasing the plain password
const hasedPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, 10);
};

const comparePassword = (plainPassword, hash) => {
  return bcrypt.compareSync(plainPassword, hash);
};

//signup controller
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
  const generatedOTP = Math.floor((Math.random() * 10000) + 1000).toString();
  const user = new User({ name, email, password: hasedPass, active: false, otp: generatedOTP });

  // User.findOne({ email }, (err, user) => {
  //   if (user && user.active == false) {
  //     user.delete();
  //   }
  // });

  return User.findOne({ email }, (err, savedUser) => {
    if (savedUser && !savedUser.active) {
      sendOtp(email, generatedOTP);

      const updatedUser = {
        name: req.body.name,
        email: req.body.email,
        password: hasedPass,
        active: false,
        otp: generatedOTP,
      };

      return User.findByIdAndUpdate(savedUser._id, updatedUser).then(user => {
        return res.status(201).json({
          name: updatedUser.name,
          email: updatedUser.email,
          id: updatedUser._id,
        });
      }).catch(err => {
        console.log(err);
        return res.status(500).json({
          msg: "Internal Server Error",
        });
      });
    } else if (!savedUser) {
      return user.save((err, user) => {
        if (!err) {
          return res.status(201).json({
            name: user.name,
            email: user.email
          });
        } else {
          return res.status(500).json({
            msg: "Internal Server Error",
          });
        }
      });
    }

    return res.status(400).json({
      msg: "email already exists.",
    });
  });
};

//Verify OTP
const verify = (req, res) => {
  const email = req.body.email;
  return User.findOne({ email }, (err, user) => {
    if (err || !user) {
      console.log(err);
      return res.status(400).json({
        msg: "Email address doesn't exist",
        param: "email",
      });
    } else {
      const otp = req.body.otp;
      if (user.otp == otp) {
        user.active = true;
        user.otp = undefined;
        user.save((err, user) => {
          if (!err) {
            return res.status(201).json({
              email: user.email,
              active: user.active,
            });
          } else {
            console.log(err);
            return res.status(500).json({
              msg: "Internal Error",
            });
          }
        });
      } else {
        return res.status(401).json({
          msg: "Wrong OTP",
        });
      }
    }
  });
};

// signin controller
const signIn = (req, res) => {

  const { email, password } = req.body;
  //console.log(req.body);

  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).json({
      msg: error.array()[0].msg,
      param: error.array()[0].param,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user || !user.active) {
      console.log(err);
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

    //console.log(user);

    const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: "1d" });

    res.cookie("jwt", token, { maxAge: 1000 * 60 * 60 * 24 });
    res.cookie("email", user.email, { maxAge: 1000 * 60 * 60 * 24 });
    res.cookie("name", user.name, { maxAge: 1000 * 60 * 60 * 24 });

    res.sendStatus(200);
  });
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.status(401).json({
    msg: "Token not found"
  });

  return jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({
        msg: "Invalid Token"
      });
    }
    req.body.id = user.id;
    next();
  });
}

module.exports = { signIn, signUp, verify, authenticateToken };
