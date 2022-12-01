const bcrypt = require("bcryptjs");

const User = require("../models/user");

const getUserDetails = (req, res) => {
    User.findById(req.body._id, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                msg: "Internal Server Error",
            });
        } else {
            return res.status(200).json({
                name: user.name,
                email: user.email,
                isActive: true
            })
        }
    });
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

module.exports = { getUserDetails, postUserDetails, comparePass };