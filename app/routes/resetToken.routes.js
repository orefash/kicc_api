module.exports = app => {
    const events = require("../controllers/reset_token.controller.js");
  
    var router = require("express").Router();
  
    // initiate token generation for password reset
    router.post("/forgot-password", events.create);

    // Verify entered token
    router.post("/verify-token", events.verifyToken);
    
    // Reset Password
    router.post("/reset-password", events.resetPass);

    
  
    app.use('/api', router);
  };