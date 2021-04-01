module.exports = (sequelize, Sequelize) => {
    const Giving = sequelize.define("giving", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user: {
            type: Sequelize.INTEGER,
            references: {
                model: 'members',
                key: 'id'
            }
        },
        reason: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.DECIMAL
        },
        refId: {
            type: Sequelize.STRING
        }
    });
  
    return Giving;
};