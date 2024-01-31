"use strict";
// models/user.model.js

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("User", {
        username: {
            type: DataTypes.STRING, unique: true, allowNull: false, validate: {
                is: /^[a-zA-Z0-9_]+$/i, notEmpty: true, len: [3, 40],
            }
        }, password: {
            type: DataTypes.STRING, allowNull: false, validate: {
                notEmpty: true, len: [8, 100],
            }
        }
    });
};
