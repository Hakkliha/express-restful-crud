const db = require("../models");
const Device = db.devices;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Name cannot be empty!"
        });
        return;
    }

    // Validate name is string
    if (typeof req.body.name !== 'string') {
        res.status(400).send({
            message: "Name must be a string!"
        });
        return;
    }

    if (!req.body.type) {
        res.status(400).send({
            message: "Type cannot be empty!"
        });
        return;
    }

    // Validate type is string
    if (typeof req.body.type !== 'string') {
        res.status(400).send({
            message: "Type must be a string!"
        });
        return;
    }

    if (!req.body.lastMaintenanceDate) {
        res.status(400).send({
            message: "Last Maintenance Date cannot be empty!"
        });
        return;
    }

    // Validate lastMaintenanceDate is date
    if (typeof req.body.lastMaintenanceDate !== 'string') {
        // Validate lastMaintenanceDate is date
        try {
            req.body.lastMaintenanceDate = new Date(req.body.lastMaintenanceDate);
        }
        catch {
            res.status(400).send({
                message: "Last Maintenance Date must be a date!"
            });
            return;
        }
        res.status(400).send({
            message: "Last Maintenance Date must be a date!"
        });
        return;
    }

    if (!req.body.maintenanceFrequency) {
        res.status(400).send({
            message: "Maintenance Frequency cannot be empty!"
        });
        return;
    }

    // Validate maintenanceFrequency is integer
    if (typeof req.body.maintenanceFrequency !== 'number') {
        res.status(400).send({
            message: "Maintenance Frequency must be an integer!"
        });
        return;
    }

    // Create a Device
    const device = {
        name: req.body.name,
        type: req.body.type,
        lastMaintenanceDate: req.body.lastMaintenanceDate,
        maintenanceFrequency: req.body.maintenanceFrequency
    };

    // Save Device in the database
    Device.create(device)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Device."
            });
        });
};

// Retrieve all Devices from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Device.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving devices."
            });
        });
};

// Find a single Device with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    // Validate id is integer

    try {
        const tmp = parseInt(id);
    }
    catch (err) {
        res.status(400).send({
            message: "Id must be an integer!"
        });
        return;
    }

    Device.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: "Device with id=" + id + " not found."
                });
            }
        })
        .catch(err => {
            res.status(500).send({
            message: "Error retrieving Device with id=" + id
            });
        });

};

// Update a Devices by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    // Validate id is integer
    try {
        const tmp = parseInt(id);
    }
    catch (err) {
        res.status(400).send({
            message: "Id must be an integer!"
        });
        return;
    }

    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Name cannot be empty!"
        });
        return;
    }

    // Validate name is string
    if (typeof req.body.name !== 'string') {
        res.status(400).send({
            message: "Name must be a string!"
        });
        return;
    }

    if (!req.body.type) {
        res.status(400).send({
            message: "Type cannot be empty!"
        });
        return;
    }

    // Validate type is string
    if (typeof req.body.type !== 'string') {
        res.status(400).send({
            message: "Type must be a string!"
        });
        return;
    }

    if (!req.body.lastMaintenanceDate) {
        res.status(400).send({
            message: "Last Maintenance Date cannot be empty!"
        });
        return;
    }

    // Validate lastMaintenanceDate is date
    if (typeof req.body.lastMaintenanceDate !== 'string') {
        // Validate lastMaintenanceDate is date
        try {
            req.body.lastMaintenanceDate = new Date(req.body.lastMaintenanceDate);
        }
        catch {
            res.status(400).send({
                message: "Last Maintenance Date must be a date!"
            });
            return;
        }
        res.status(400).send({
            message: "Last Maintenance Date must be a date!"
        });
        return;
    }

    if (!req.body.maintenanceFrequency) {
        res.status(400).send({
            message: "Maintenance Frequency cannot be empty!"
        });
        return;
    }

    // Validate maintenanceFrequency is integer
    if (typeof req.body.maintenanceFrequency !== 'number') {
        res.status(400).send({
            message: "Maintenance Frequency must be an integer!"
        });
        return;
    }

    Device.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                message: "Device was updated successfully."
                });
            } else {
                res.send({
                message: `Cannot update Device with id=${id}. Maybe Device was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
            message: "Error updating Device with id=" + id
            });
        });

};

// Delete a Devices with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    // Validate id is integer
    try {
        const tmp = parseInt(id);
    }
    catch (err) {
        res.status(400).send({
            message: "Id must be an integer!"
        });
        return;
    }

    Device.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                message: "Device was deleted successfully!"
                });
            } else {
                res.send({
                message: `Cannot delete Device with id=${id}. Maybe Device was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
            message: "Could not delete Device with id=" + id
            });
        });

};

// Delete all Devices from the database.
exports.deleteAll = (req, res) => {
    Device.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Devices were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while removing all devices."
            });
        });
};