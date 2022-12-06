const bcrypt = require("bcryptjs");

const User = require("../models/user");

const getUserDetails = (req, res) => {
    User.findById({ "_id": req.body.id }, (err, user) => {
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

const updateUser = (req, res) => {

    return User.findByIdAndUpdate({ "_id": req.body.id }, req.body).then(user => {
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

module.exports = { getUserDetails, updateUser };