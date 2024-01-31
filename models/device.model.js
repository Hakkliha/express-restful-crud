"use strict";
// models/device.model.js

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("Device", {
        name: {
            type: Sequelize.STRING, allowNull: false, validate: {
                notEmpty: true, len: [2, 100],
            }
        }, type: {
            type: Sequelize.STRING, allowNull: false, validate: {
                notEmpty: true, len: [2, 100],
            }
        }, lastMaintenanceDate: {
            type: Sequelize.DATE, allowNull: false, validate: {
                notEmpty: true, isDate: true,
            }
        }, maintenanceFrequency: {
            type: Sequelize.INTEGER, allowNull: false, validate: {
                notEmpty: true, isInt: true,
            }
        }
    }, {
        timestamps: true, paranoid: true
    });
};