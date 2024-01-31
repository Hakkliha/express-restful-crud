"use strict";
// controllers/device.controller.js

const db = require("../models");
const Device = db.devices;
const Op = db.Sequelize.Op;
const {ValidationError, NotFoundError} = require("../handlers");


const deviceController = {
    create: async (req, res, next) => {
        try {
            const device = await Device.create({
                name: req.body.name,
                type: req.body.type,
                lastMaintenanceDate: req.body.lastMaintenanceDate,
                maintenanceFrequency: req.body.maintenanceFrequency
            });
            res.status(201).send(device);
        } catch (error) {
            next(error);
        }
    }, findAll: async (req, res, next) => {
        try {
            const queryConditions = {};
            // Dynamically add search conditions based on request body
            for (const [key, value] of Object.entries(req.body)) {
                if (value) {
                    queryConditions[key] = {[Op.like]: `%${value}%`};
                }
            }
            const devices = await Device.findAll({where: queryConditions});
            res.send(devices);
        } catch (error) {
            next(error);
        }

    }, findOne: async (req, res, next) => {
        try {
            const id = req.params.id;
            const device = await Device.findByPk(id);
            if (device) {
                res.send(device);
            } else {
                throw new NotFoundError(["Device with id=" + id + " not found."]);
            }
        } catch (error) {
            next(error);
        }
    }, update: async (req, res, next) => {
        try {
            const id = req.params.id;
            const device = await Device.findByPk(id);
            if (device) {
                const updatedDevice = await Device.update(req.body, {
                    where: {id: id}
                });
                res.send({
                    message: "Device(s) was updated successfully!",
                    updated: updatedDevice[0]
                });
            } else {
                throw new NotFoundError(["Device with id=" + id + " not found."]);
            }
        } catch (error) {
            next(error);
        }
    }, delete: async (req, res, next) => {
        try {
            const id = req.params.id;
            const num = await Device.destroy({
                where: {id: id}
            });
            if (num === 1) {
                res.send({
                    message: "Device was deleted successfully!"
                });
            } else {
                throw new NotFoundError([`Cannot delete Device with id=${id}. Maybe Device was not found!`]);
            }
        } catch (error) {
            next(error);
        }
    }, deleteAll: async (req, res, next) => {
        try {
            const num = await Device.destroy({
                where: {}, truncate: false
            });
            res.send({message: `${num} Devices were deleted successfully!`});
        } catch (error) {
            next(error);
        }
    }, reminder: async (req, res, next) => {
        try {
            const daysUntilDue = req.body.daysUntilDue || 14;

            if (isNaN(daysUntilDue) || !isFinite(daysUntilDue)) {
                throw new ValidationError(["daysUntilDue must be a number"]);
            }

            // Get all devices due for maintenance
            const devices = await Device.findAll();
            const today = new Date();
            today.setDate(today.getDate() + daysUntilDue);

            const devicesDue = devices.filter(device => {
                const nextMaintenanceDate = calculateNextMaintenanceDate(device.lastMaintenanceDate, device.maintenanceFrequency);
                return today >= nextMaintenanceDate;
            });

            res.status(200).send(devicesDue);
        } catch (error) {
            next(error);
        }
    }
};

function calculateNextMaintenanceDate(lastMaintenanceDate, maintenanceFrequency) {
    const nextMaintenanceDate = new Date(lastMaintenanceDate);
    nextMaintenanceDate.setDate(nextMaintenanceDate.getDate() + maintenanceFrequency);
    return nextMaintenanceDate;
}

module.exports = deviceController;