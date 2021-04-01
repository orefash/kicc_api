module.exports = (sequelize, Sequelize) => {
    const UnitMembership = sequelize.define("unit_membership", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        member: {
            type: Sequelize.INTEGER,
            references: {
                model: 'members',
                key: 'id'
            }
        },
        unit: {
            type: Sequelize.INTEGER,
            references: {
                model: 'units',
                key: 'id'
            }
        },
        description: {
            type: Sequelize.STRING
        }
    });
  
    return UnitMembership;
};