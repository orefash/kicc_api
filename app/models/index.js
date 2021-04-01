const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
// const sequelize = new Sequelize("", dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

// await sequelize.query("CREATE DATABASE if not exists kicc_db;").then(data => {
//     // code to run after successful creation.
//     await sequelize.query("use kicc_db;")
//     console.log("Kicc_db created")
//   });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.relnTypes = require("./relationship_type.model.js")(sequelize, Sequelize);
db.branches = require("./branch.model.js")(sequelize, Sequelize);
db.members = require("./member.model.js")(sequelize, Sequelize);
db.stewardUnits = require("./steward_unit.model.js")(sequelize, Sequelize);
db.unitMemberships = require("./unit_membership.model.js")(sequelize, Sequelize);
db.mRelns = require("./member_relationship.model.js")(sequelize, Sequelize);
db.branch_units = require("./branch_unit.model.js")(sequelize, Sequelize);
db.oldMembers = require("./old_member.model.js")(sequelize, Sequelize);
db.check = require("./check.model.js")(sequelize, Sequelize);
db.event = require("./event.model.js")(sequelize, Sequelize);
// db.eventReg = require("./event_reg.model.js")(sequelize, Sequelize);
db.giving = require("./giving.model.js")(sequelize, Sequelize);
db.message = require("./message.model.js")(sequelize, Sequelize);
db.prayReq = require("./prayer_req.model.js")(sequelize, Sequelize);
db.testimony = require("./testimony.model.js")(sequelize, Sequelize);
db.resetToken = require("./reset_token.model.js")(sequelize, Sequelize);

// db.eventReg


db.event.belongsToMany(db.members, {
  through: "event_reg",
  as: "members",
  foreignKey: "event_id",
});

db.members.belongsToMany(db.event, {
  through: "event_reg",
  as: "events",
  foreignKey: "member_id",
});


db.members.hasMany(db.testimony, { as: "testimonies" });
db.testimony.belongsTo(db.members, {
  foreignKey: "memberId",
  as: "members",
});

db.members.hasMany(db.prayReq, { as: "prayer_requests" });
db.prayReq.belongsTo(db.members, {
  foreignKey: "memberId",
  as: "members",
});




module.exports = db;
