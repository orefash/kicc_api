module.exports = (sequelize, Sequelize) => {
    const ResetToken = sequelize.define("reset_token", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: Sequelize.STRING
        },
        token: {
            type: Sequelize.STRING
        },
        expiration: {
            type: Sequelize.DATE
        },
        used: {
            type: Sequelize.BOOLEAN,
            allowNull: false, 
            defaultValue: false
        }
    });
  
    return ResetToken;
};