module.exports = (sequelize, Sequelize) => {
    const BranchUnit = sequelize.define("branch_unit", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        branchId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'branches',
                key: 'id'
            }
        },
        unitId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'units',
                key: 'id'
            }
        },
        leader: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        }
    });
  
    return BranchUnit;
};