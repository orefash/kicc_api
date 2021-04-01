module.exports = (sequelize, Sequelize) => {
    const PrayReq = sequelize.define("prayer_request", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        request: {
            type: Sequelize.STRING
        },
        can_reach: {
            type: Sequelize.BOOLEAN,
            allowNull: false, 
            defaultValue: false
        },
        status: {
            type: Sequelize.STRING
        }
    });
  
    return PrayReq;
};