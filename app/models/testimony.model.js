module.exports = (sequelize, Sequelize) => {
    const Testimony = sequelize.define("testimony", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        testimony: {
            type: Sequelize.STRING
        },
        approved: {
            type: Sequelize.BOOLEAN,
            allowNull: false, 
            defaultValue: false
        }
    });
  
    return Testimony;
};