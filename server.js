const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// // simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the device application." });
});

const db = require('./models'); // Import the database model
db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

// Import the device routes
require("./routes/device.routes")(app);

// Import the auth routes
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);


// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});