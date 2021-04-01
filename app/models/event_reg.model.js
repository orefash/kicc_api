const User = require("../models/member.model");


module.exports = (sequelize, Sequelize) => {
    const EventReg = sequelize.define("event_reg", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        event: {
            type: Sequelize.INTEGER
        },
        user: {
            type: Sequelize.INTEGER,
            references: {
                model: 'members',
                key: 'id'
            }
        }
    });
  
    return EventReg;
};