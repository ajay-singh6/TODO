const bcrypt = require("bcryptjs");

const User = require("../models/user");


const getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          err: err,
          error: "No user was found in DB"
        });
      }
      req.profile = user;
      next();
    });
  };
  

const getUserDetails = (req, res) => {

    const {_id , name, email } = req.profile;
    // User.findById(req.body._id, (err, user) => {
        // if (err) {
        //     console.log(err);
        //     return res.status(500).json({
        //         msg: "Internal Server Error",
        //     });
        // } else {
           
        
        return res.status(200).json({
                // name: user.name,
                // email: user.email,
                // isActive: true
                name, email
            })

            
        // }
    // });
}

const postUserDetails = (req, res) => {
    const hasedPassword = bcrypt.hashSync(req.body.password, 10);

    const user = {
        name: req.body.name,
        email: req.body.email,
        password: hasedPassword
    }

    return User.findByIdAndUpdate(req.body._id, user).then(user => {
        return res.status(200).json({
            name: user.name,
            email: user.email,
            isActive: true
        });
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            msg: "Internal Server Error"
        });
    });
}

module.exports = { getUserDetails, postUserDetails, getUserById };