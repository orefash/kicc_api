module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "AllHail1Me",
    DB: "kicc_test",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };


  // module.exports = {
  //   HOST: "localhost",
  //   USER: "root",
  //   PASSWORD: "AllHail1Me",
  //   DB: "kicc_db",
  //   dialect: "mysql",
  //   pool: {
  //     max: 5,
  //     min: 0,
  //     acquire: 30000,
  //     idle: 10000
  //   }
  // };