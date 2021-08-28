let express = require("express");
let bodyParser = require("body-parser");
let jsonParser = bodyParser.json();
let router = express.Router();
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");

let { UserController } = require("../models/user");
let ServerError = require("../error");
let { SECRET } = require("../config");

let foundUser;

router.post("/login", jsonParser, (req, res) => {
    let { email, password } = req.body;

    if (email == undefined || password == undefined) {
        res.statusMessage = "No email or password provided";
        return res.status(406).send();
    }

    UserController.getByEmail(email)
        .then((user) => {
            if (user == null) {
                throw new ServerError(404, "User not found");
            }

            foundUser = user;

            console.log("comparing ", password, user.password);

            return bcrypt.compare(password, user.password);
        })
        .then((result) => {
            let data = {
                id: foundUser._id,
                name: foundUser.name,
            };

            let token = jwt.sign(data, SECRET, {
                expiresIn: 60 * 60,
            });

            if (result) {
                return res.status(200).json({
                    token: token,
                    id: foundUser._id,
                    name: foundUser.name,
                });
            } else {
                throw new ServerError(401, "Invalid password");
            }
        })
        .catch((error) => {
            if (error.code === 404) {
                res.statusMessage = error.message;
                return res.status(404).send();
            } else if (error.code === 401) {
                res.statusMessage = error.message;
                return res.status(401).send();
            }

            console.log(error);

            res.statusMessage = "Database error";
            return res.status(500).send();
        });
});

router.get("/validate/:token", (req, res) => {
    let token = req.params.token;

    jwt.verify(token, SECRET, (err, user) => {
        if (err) {
            res.statusMessage = "Invalid token";
            return res.status(401).json({ message: "error" });
        }

        console.log(user);
        return res.status(200).json({
            message: "success",
            id: user.id,
            name: user.name,
            token: token,
        });
    });
});

module.exports = router;
