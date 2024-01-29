module.exports = app => {
    const devices = require("../controllers/device.controller");

    const router = require("express").Router();

    const authenticateToken = require('../middleware/auth.middleware');

    // Create a new Device
    // router.post("/", devices.create);
    router.post("/", authenticateToken, devices.create);

    // Retrieve all Devices
    // router.get("/", devices.findAll);
    router.get("/", authenticateToken, devices.findAll);
    // Retrieve reminders
    router.get("/reminders", authenticateToken, devices.reminder);

    // Retrieve a single Device with id
    // router.get("/:id", devices.findOne);
    router.get("/:id", authenticateToken, devices.findOne);

    // Update a Device with id
    // router.put("/:id", devices.update);
    router.put("/:id", authenticateToken, devices.update);

    // Delete a Device with id
    // router.delete("/:id", devices.delete);
    router.delete("/:id", authenticateToken, devices.delete);

    // Delete all Devices
    // router.delete("/", devices.deleteAll);
    router.delete("/", authenticateToken, devices.deleteAll);

    app.use('/api/', router);
};