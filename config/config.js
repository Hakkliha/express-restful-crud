module.exports = {
    JWT_SECRET: "f631a5a2412b5b0bfee62e444fd829580652ad9463e830c459b966d0ce8c5e8a",
    HOST: "localhost",
    USER: "db",
    PASSWORD: "db",
    DB: "db",
    dialect: "postgres",
    port: 35432,
    logging: true,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    development: {
        username: "db",
        password: "db", // Ensure this is a string
        database: "db",
        host: "localhost",
        dialect: "postgres",
        port: 35432,
        logging: true,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
};