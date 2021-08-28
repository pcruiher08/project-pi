let mongoose = require("mongoose");
let ServerError = require("../error");

mongoose.Promise = global.Promise;

let cameraCollection = mongoose.Schema({
    latitude: Number,
    longitude: Number,
    street: String,
    directions: [String],
});

let Camera = mongoose.model("cameras", cameraCollection);

let CameraController = {
    getAll: function () {
        return Camera.find()
            .then((cameras) => {
                return cameras;
            })
            .catch((error) => {
                console.log(error);
                throw new ServerError(500, "Database error");
            });
    },
    getById: function (id) {
        return Camera.findById(id)
            .then((camera) => {
                return camera;
            })
            .catch((error) => {
                console.log(error);
                throw new ServerError(500, "Database error");
            });
    },
    create: function (newcamera) {
        return Camera.create(newcamera)
            .then((nu) => {
                return nu;
            })
            .catch((error) => {
                console.log(error);
                throw new ServerError(500, "Database error");
            });
    },
    update: function (id, updatedcamera) {
        return Camera.findByIdAndUpdate(id, updatedcamera)
            .then((uu) => {
                return uu;
            })
            .catch((error) => {
                console.log(error);
                throw new ServerError(500, "Database error");
            });
    },
    delete: function (id) {
        return Camera.findByIdAndRemove(id)
            .then((ru) => {
                return ru;
            })
            .catch((error) => {
                console.log(error);
                throw new ServerError(500, "Database error");
            });
    },
};

module.exports = { CameraController };
