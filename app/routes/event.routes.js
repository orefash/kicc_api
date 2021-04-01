module.exports = app => {
    const events = require("../controllers/event.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Member
    router.post("/", events.create);

    
    // Create a event reg
    router.post("/register", events.register);
  
    // Retrieve all events
    router.get("/", events.findAll);
  
    // Retrieve a single Event with id
    router.get("/:id", events.findOne);
  
    // Update a Event with id
    router.post("/update", events.update);
  
    // Delete a Event with id
    router.delete("/:id", events.delete);
  
    // Delete all events
    router.delete("/", events.deleteAll);
  
    app.use('/api/events', router);
  };