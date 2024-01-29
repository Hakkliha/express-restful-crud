// controllers/authController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const config = require('../config/config');

const authController = {
    register: async (req, res) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 12);
            const user = await User.create({
                username: req.body.username,
                password: hashedPassword
            });
            res.status(201).send(user);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    login: async (req, res) => {
        try {
            const user = await User.findOne({ where: { username: req.body.username } });
            if (!user) {
                return res.status(400).send('User not found');
            }

            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                return res.status(400).send('Incorrect password');
            }

            const token = jwt.sign({ id: user.id }, config.JWT_SECRET, { expiresIn: '1h' }); // Replace 'secret_key' with a real secret key
            res.send({ user, token });
        } catch (error) {
            res.status(500).send(error);
        }
    }
};

module.exports = authController;
