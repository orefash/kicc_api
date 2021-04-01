module.exports = (sequelize, Sequelize) => {
    const RelnType = sequelize.define("reln_type", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        }
    });
  
    return RelnType;
};