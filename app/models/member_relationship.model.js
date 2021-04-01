module.exports = (sequelize, Sequelize) => {
    const MemberReln = sequelize.define("member_reln", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        member1: {
            type: Sequelize.INTEGER,
            references: {
                model: 'members',
                key: 'id'
            }
        },
        member2: {
            type: Sequelize.INTEGER,
            references: {
                model: 'members',
                key: 'id'
            }
        },
        relationship: {
            type: Sequelize.INTEGER,
            references: {
                model: 'reln_types',
                key: 'id'
            }
        },
        description: {
            type: Sequelize.STRING
        }
    });
  
    return MemberReln;
};