// Node Modules
let express = require("express");
let morgan = require("morgan");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let path = require("path");
let cors = require("cors");
let jsonParser = bodyParser.json();
let app = express();

require("dotenv").config();

// Routes
let authRoutes = require("./routes/auth");
let authUsers = require("./routes/users");

// Custom dependencies
let { DATABASE_URL, PORT } = require("./config");
let middleware = require("./middleware");

app.use(cors());
app.use(morgan("dev"));

app.use("/auth", authRoutes);
app.use("/users", authUsers);

let server;

function runServer(port, databaseUrl) {
    return new Promise((resolve, reject) => {
        mongoose.connect(
            databaseUrl,
            { useNewUrlParser: true, useUnifiedTopology: true },
            (response) => {
                if (response) {
                    return reject(response);
                } else {
                    server = app
                        .listen(port, () => {
                            console.log("App is running on port " + port);
                            resolve();
                        })
                        .on("error", (err) => {
                            mongoose.disconnect();
                            return reject(err);
                        });
                }
            }
        );
    });
}

function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log("Closing the server");
            server.close((err) => {
                if (err) {
                    return reject(err);
                } else {
                    resolve();
                }
            });
        });
    });
}

runServer(PORT, DATABASE_URL);

module.exports = { app, runServer, closeServer };
