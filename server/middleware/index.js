let jwt = require("jsonwebtoken");
let { SECRET } = require("../config");

middleware = {
    isLoggedIn: function (req, res, next) {
        let token = req.headers.authorization;

        if (token == undefined) {
            res.statusMessage = "No token given";
            return res.status(401).send();
        }
        token = token.replace("Bearer ", "");

        jwt.verify(token, SECRET, (err, user) => {
            if (err) {
                res.statusMessage = "Invalid token";
                return res.status(401).send();
            }

            next();
        });
    },
};

module.exports = middleware;
