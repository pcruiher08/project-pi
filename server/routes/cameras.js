let express = require("express");
let bodyParser = require("body-parser");
let jsonParser = bodyParser.json();
let router = express.Router();

let { CameraController } = require("../models/camera");
let ServerError = require("../error");

router.get("/all", jsonParser, (req, res) => {
    CameraController.getAll()
        .then((cameras) => {
            return res.status(200).json(cameras);
        })
        .catch((error) => {
            res.statusMessage = error.message;
            return res.status(error.code).send();
        });
});

router.post("/create", jsonParser, (req, res) => {
    let latitude, longitude, street, directions;

    latitude = req.body.latitude;
    longitude = req.body.longitude;
    street = req.body.street;
    directions = req.body.directions;

    if (
        latitude == undefined ||
        longitude == undefined ||
        street == undefined ||
        directions == undefined ||
        !Array.isArray(directions)
    ) {
        res.statusMessage = "Parameters to create users incomplete";
        return res.status(406).send();
    }

    CameraController.create({
        latitude: latitude,
        longitude: longitude,
        street: street,
        directions: directions,
    })
        .then((nu) => {
            return res.status(201).json(nu);
        })
        .catch((error) => {
            console.log(error);
            if (error.code === 409) {
                res.statusMessage = "User with given email already exists";
                return res.status(409).send();
            } else {
                res.statusMessage = "Database error";
                return res.status(500).send();
            }
        });
});

router.put("/update/:id", jsonParser, async (req, res) => {
    let id = req.params.id;

    if (id == undefined) {
        res.statusMessage = "No id given to update";
        return res.status(406).send();
    }

    CameraController.getById(id)
        .then((camera) => {
            if (camera == null) {
                throw new ServerError(404, "ID not found");
            }
            let { latitude, longitude, street, directions } = req.body;

            if (
                latitude == undefined &&
                longitude == undefined &&
                street == undefined &&
                directions == undefined
            ) {
                res.statusMessage = "No parameters to modify in update";
                return res.status(409).send();
            }

            let newcamera = {};

            if (latitude != undefined) {
                newcamera.latitude = latitude;
            }
            if (street != undefined) {
                newcamera.street = street;
            }
            if (longitude != undefined) {
                newcamera.longitude = longitude;
            }
            if (directions != undefined) {
                newcamera.directions = directions;
            }

            return CameraController.update(id, newcamera);
        })
        .then((nu) => {
            return res.status(202).json(nu);
        })
        .catch((error) => {
            console.log(error);
            if (error.code === 404) {
                res.statusMessage = "User not found with given id";
                return res.status(404).send();
            } else {
                res.statusMessage = "Database error";
                return res.status(500).send();
            }
        });
});

router.delete("/delete/:id", jsonParser, (req, res) => {
    let id = req.params.id;

    if (id == undefined) {
        res.statusMessage = "No ID given to delete";
        return res.status(406).send();
    }

    CameraController.getById(id)
        .then((user) => {
            if (user == null) {
                throw new ServerError(404, "User not found");
            }

            return CameraController.delete(id);
        })
        .then((user) => {
            return res.status(200).send();
        })
        .catch((error) => {
            console.log(error);
            if (error.code === 404) {
                res.statusMessage = "User not found with given id";
                return res.status(404).send();
            } else {
                res.statusMessage = "Database error";
                return res.status(500).send();
            }
        });
});

router.get("/:id", jsonParser, (req, res) => {
    let id = req.params.id;

    if (id == undefined) {
        res.statusMessage = "No id given to get users";
        return res.status(406).send();
    }

    CameraController.getById(id)
        .then((user) => {
            if (user == null) {
                throw new ServerError(404, "ID not found");
            }
            return res.status(200).json(user);
        })
        .catch((error) => {
            res.statusMessage = error.message;
            return res.status(error.code).send();
        });
});

module.exports = router;
