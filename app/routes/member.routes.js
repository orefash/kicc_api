module.exports = app => {
    const members = require("../controllers/member.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Member
    router.post("/", members.create);

    // Create a new Member Reln
    router.post("/mreln", members.createReln);

    
    // Login User
    router.post("/login", members.loginUser);
  
    // Retrieve all members
    router.get("/", members.findAll);
  
    // Retrieve all published members
    // router.get("/published", members.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", members.findOne);
  
    // Update a User with id
    router.post("/update", members.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", members.delete);
  
    // Delete all members
    router.delete("/", members.deleteAll);
  
    app.use('/api/members', router);
  };