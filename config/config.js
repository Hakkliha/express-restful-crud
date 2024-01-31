"use strict";
// config/config.js

module.exports = {
    HOST: "localhost",
    USER: "db",
    PASSWORD: "db",
    DB: "db",
    dialect: "postgres",
    port: 35432,
    logging: true,
    pool: {
        max: 5, min: 0, acquire: 30000, idle: 10000
    },
    development: {
        username: "db",
        password: "db",
        database: "db",
        host: "localhost",
        dialect: "postgres",
        port: 35432,
        logging: true,
        pool: {
            max: 5, min: 0, acquire: 30000, idle: 10000
        }
    },
};