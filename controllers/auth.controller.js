"use strict";
// controllers/authController.js

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {User} = require("../models");
const {UnauthorizedError, ValidationError} = require("../handlers");


const authController = {
    register: async (req, res, next) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 12);
            // get all users to check duplicate usernames
            const users = await User.findAll({where: {username: req.body.username}});
            if (users.length > 0) {
                throw new ValidationError(["Username already exists"]);
            }
            const user = await User.create({
                username: req.body.username, password: hashedPassword
            });
            res.status(201).send(user);
        } catch (error) {
            next(error);
        }
    },

    login: async (req, res, next) => {
        try {
            const user = await User.findOne({where: {username: req.body.username}});
            if (!user) {
                throw new UnauthorizedError(["User not found"]);
            }

            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                throw new UnauthorizedError(["Incorrect password"]);
            }
            console.log(process.env.JWT_SECRET);
            const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: "1h"}); // Replace "secret_key" with a real secret key
            res.status(200).send({user, token});
        } catch (error) {
            next(error);
        }
    }
};

module.exports = authController;
