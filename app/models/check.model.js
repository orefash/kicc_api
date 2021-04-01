module.exports = (sequelize, Sequelize) => {
    const Check = sequelize.define("check", {
        flag: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        status: {
            type: Sequelize.STRING
        }
    });
  
    return Check;
};