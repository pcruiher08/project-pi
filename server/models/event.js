let mongoose = require("mongoose");
let ServerError = require("../error");

mongoose.Promise = global.Promise;

let eventTypes = ["EXCESS_SPEED", "NONLINEAR_DRIVING"];

let eventCollection = mongoose.Schema({
    latitude: Number,
    longitude: Number,
    type: String,
    datetime: { type: Date, default: Date.now },
    direction: Number,
});

let Event = mongoose.model("events", eventCollection);

let EventController = {
    getAll: function () {
        return Event.find()
            .then((events) => {
                return events;
            })
            .catch((error) => {
                console.log(error);
                throw new ServerError(500, "Database error");
            });
    },
    getById: function (id) {
        return Event.findById(id)
            .then((event) => {
                return event;
            })
            .catch((error) => {
                console.log(error);
                throw new ServerError(500, "Database error");
            });
    },
    getByLocation: function (lat, lon, r, start) {
        return Event.find({ datetime: { $gte: start } })
            .then((e) => {
                events = [];
                e.forEach((ev) => {
                    let distance = Math.sqrt(
                        Math.pow(ev.latitude - lat, 2) +
                            Math.pow(ev.longitude - lon, 2)
                    );

                    if (distance < r) {
                        events.push(ev);
                    }
                });
                return events;
            })
            .catch((error) => {
                console.log(error);
                throw new ServerError(500, "Database error");
            });
    },
    create: function (newevent) {
        if (!eventTypes.includes(newevent.type)) {
            throw new ServerError(406, "Invalid event type");
        }
        return Event.create(newevent)
            .then((nu) => {
                return nu;
            })
            .catch((error) => {
                console.log(error);
                throw new ServerError(500, "Database error");
            });
    },
    update: function (id, updatedevent) {
        return Event.findByIdAndUpdate(id, updatedevent)
            .then((uu) => {
                return uu;
            })
            .catch((error) => {
                console.log(error);
                throw new ServerError(500, "Database error");
            });
    },
    delete: function (id) {
        return Event.findByIdAndRemove(id)
            .then((ru) => {
                return ru;
            })
            .catch((error) => {
                console.log(error);
                throw new ServerError(500, "Database error");
            });
    },
};

module.exports = { EventController };
