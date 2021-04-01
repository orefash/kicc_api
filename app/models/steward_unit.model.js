module.exports = (sequelize, Sequelize) => {
    const Unit = sequelize.define("unit", {
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
  
    return Unit;
};