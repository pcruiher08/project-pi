let mongoose = require("mongoose");
let ServerError = require("../error");

mongoose.Promise = global.Promise;

let userCollection = mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: String,
});

let User = mongoose.model("users", userCollection);

let UserController = {
    getAll: function () {
        return User.find()
            .then((users) => {
                return users;
            })
            .catch((error) => {
                console.log(error);
                throw new ServerError(500, "Database error");
            });
    },
    getById: function (id) {
        return User.findById(id)
            .then((user) => {
                return user;
            })
            .catch((error) => {
                console.log(error);
                throw new ServerError(500, "Database error");
            });
    },
    getByEmail: function (email) {
        return User.findOne({ email: email })
            .then((user) => {
                return user;
            })
            .catch((error) => {
                console.log(error);
                throw new ServerError(500, "Database error");
            });
    },
    create: function (newUser) {
        return User.create(newUser)
            .then((nu) => {
                return nu;
            })
            .catch((error) => {
                console.log(error);
                throw new ServerError(500, "Database error");
            });
    },
    update: function (id, updatedUser) {
        return User.findByIdAndUpdate(id, updatedUser)
            .then((uu) => {
                return uu;
            })
            .catch((error) => {
                console.log(error);
                throw new ServerError(500, "Database error");
            });
    },
    delete: function (id) {
        return User.findByIdAndRemove(id)
            .then((ru) => {
                return ru;
            })
            .catch((error) => {
                console.log(error);
                throw new ServerError(500, "Database error");
            });
    },
};

module.exports = { UserController };
