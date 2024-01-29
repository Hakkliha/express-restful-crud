module.exports = (sequelize, Sequelize) => {
const Device = sequelize.define("Device", {
        name: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        lastMaintenanceDate: {
            type: Sequelize.DATE
        },
        maintenanceFrequency: {
            type: Sequelize.INTEGER
        }
    }, {
        timestamps: true,
        paranoid: true
    });

    return Device;
};