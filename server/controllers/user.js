const multer = require("multer");

const User = require("../models/user");
const Image = require("../models/image");

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
                image: user.image,
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
            image: user.image,
            isActive: true
        });
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            msg: "Internal Server Error"
        });
    });
}

const Storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, file.originalname + Math.round(Math.random() * 1e9));
    }
});

const upload = multer({
    storage: Storage
}).single("testImage");

const uploadImage = (req, res) => {

    var userId = req.body.id;

    return upload(req, res, (err) => {

        if (err) {
            console.log(err);
            return res.status(400).json({
                msg: "Couldn't upload"
            });
        } else {
            return User.findByIdAndUpdate({ "_id": userId }, {
                image: {
                    data: req.file.filename,
                    contentType: "image/jpg"
                }
            }).then(user => {
                return res.status(200).json({
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    isActive: true
                });
            }).catch(err => {
                console.log(err);
                return res.status(500).json({
                    msg: "Internal Server Error"
                });
            });


            // return Image.save().then(() => res.status(201).json({
            //     msg: "Successfully uploaded"
            // })).catch(err => {
            //     console.log(err);
            //     return res.status(400).json({
            //         msg: "Couldn't upload"
            //     });
            // });
        }
    });
}

module.exports = { getUserDetails, updateUser, uploadImage };