module.exports = (sequelize, Sequelize) => {
    const Branch = sequelize.define("branch", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        location: {
            type: Sequelize.STRING
        },
        pastor: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        phone1: {
            type: Sequelize.STRING
        },
        state: {
            type: Sequelize.STRING
        },
        url: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        }
    });
  
    return Branch;
};