let express = require("express");
let bodyParser = require("body-parser");
let jsonParser = bodyParser.json();
let router = express.Router();

let { EventController } = require("../models/event");
let ServerError = require("../error");
const { type } = require("os");

router.get("/all", jsonParser, (req, res) => {
    EventController.getAll()
        .then((events) => {
            return res.status(200).json(events);
        })
        .catch((error) => {
            res.statusMessage = error.message;
            return res.status(error.code).send();
        });
});

router.post("/create", jsonParser, (req, res) => {
    let latitude, longitude, direction, type;

    latitude = req.body.latitude;
    longitude = req.body.longitude;
    direction = req.body.direction;
    type = req.body.type;

    if (
        latitude == undefined ||
        longitude == undefined ||
        direction == undefined ||
        type == undefined
    ) {
        res.statusMessage = "Parameters to create users incomplete";
        return res.status(406).send();
    }

    EventController.create({
        latitude: latitude,
        longitude: longitude,
        direction: direction,
        type: type,
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
                res.statusMessage = error.message;
                return res.status(error.code).send();
            }
        });
});

router.get("/fetch", jsonParser, (req, res) => {
    let lat = req.query.lat;
    let lon = req.query.lon;

    if (lat == undefined || lon == undefined) {
        res.statusMessage = "Latitute and longitude missing to fetch events";
        return res.status(406).send();
    }

    let now = Date.now();

    EventController.getByLocation(lat, lon, now)
        .then((events) => {
            res.status(200).json(events);
        })
        .catch((error) => {
            console.log(error);
            if (error.code === 404) {
                res.statusMessage = "Event not found with given id";
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

    EventController.getById(id)
        .then((user) => {
            if (user == null) {
                throw new ServerError(404, "User not found");
            }

            return EventController.delete(id);
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

    EventController.getById(id)
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
