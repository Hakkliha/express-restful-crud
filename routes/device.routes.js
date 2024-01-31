"use strict";
// routes/device.routes.js

const express = require("express");
const router = express.Router();
const deviceController = require("../controllers/device.controller");
const authenticateToken = require("../middleware/auth.middleware");

// Create a new Device
router.post("/", authenticateToken, deviceController.create);
// Retrieve all Devices
router.get("/", authenticateToken, deviceController.findAll);
// Retrieve reminders
router.get("/reminders", authenticateToken, deviceController.reminder);
// Retrieve a single Device with id
router.get("/:id", authenticateToken, deviceController.findOne);
// Update a Device with id
router.put("/:id", authenticateToken, deviceController.update);
// Delete a Device with id
router.delete("/:id", authenticateToken, deviceController.delete);
// Delete all Devices
router.delete("/", authenticateToken, deviceController.deleteAll);

module.exports = router;