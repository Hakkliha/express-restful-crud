"use strict";
// server.js

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const deviceRoutes = require("./routes/device.routes");
const authRoutes = require("./routes/auth.routes");
const app = express();
const db = require("./models");
const errorHandler = require("./middleware/error.middleware");


const getOriginURI = () => {
    if (process.env.NODE_ENV === "production") {
        return `${process.env.PROTOCOL}://${process.env.HOST}`;
    } else {
        return "http://localhost:3000";
    }
}

const corsOptions = {
    origin: getOriginURI()
};

app.use(cors(corsOptions));


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

// simple route
app.get("/", (req, res) => {
    res.json({message: "Welcome to the device application."});
});

async function syncDatabase() {
    try {
        await db.sequelize.sync();
        console.log("Synced db.");
    } catch (err) {
        console.log("Failed to sync db: " + err.message);
    }
}

syncDatabase();

app.use("/api/", deviceRoutes);

app.use("/api/auth", authRoutes);

app.use(errorHandler);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});