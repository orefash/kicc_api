const db = require("../models");
const Event = db.event;
const User = db.members;
const Op = db.Sequelize.Op;


// Create and Save a new Member
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title || !req.body.description || !req.body.date) {
        res.status(400).send({
        message: "incomplete details sent!"
        });
        return;
    }

    console.log("In event create: ", req.body);
    
    // Save Member in the database
    Event.create(req.body)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
          console.log( err, "Some error occurred while creating the Event.");
        res.status(500).send({
            message:
            err || "Some error occurred while creating the Event."
        });
        });
};


// Register user for event
exports.register = async (req, res) => {
  // Validate request
  if (!req.body.user || !req.body.event ) {
      res.status(400).send({
        resp: "fail",
        message: "incomplete details sent!"
      });
      return;
  }

  console.log("In event register: ", req.body);



  Event.findByPk(req.body.event)
    .then( event => {
      if(!event) {
        res.status(404).send({
          resp: "fail",
          message: "Event not found"
        });
      }
      User.findByPk(req.body.user)
      .then( user => {
        if(!user) {
          res.status(404).send({
            resp: "fail",
            message: "User not found"
          });
        }
        event.addMember(user)
        res.status(200).send({
          resp: "success",
          message:
          "User Registered successfully"
        });

      })
      
    }).catch(err => {
      console.log( err, "Some error occurred while registering the Event.");
      res.status(500).send({
          message:
          err || "Some error occurred during registration."
      });
    });
  
        
};

// Retrieve all Events from the database.
exports.findAll = (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Event.findAll({
      attributes: { 
        include: [[db.Sequelize.fn("COUNT", db.Sequelize.col("members.id")), "regCount"]] 
      },
      include: [
        {
          model: User,
          as: "members",
          // attributes: ["id", "fname", "mname", "lname", "email", "phone1"],
          attributes: [],
          through: {
            attributes: [],
          }
        },
      ]
    })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Event."
        });
    });
  };

// Find a single Event with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Event.findByPk(id, {
    include: [
      {
        model: User,
        as: "members",
        attributes: ["id", "fname", "mname", "lname", "email", "phone1"],
        // attributes: [],
        through: {
          attributes: [],
        }
      },
    ]
  })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Event with id=" + id
      });
    });
};


// Update a Event by the id in the request
exports.update = (req, res) => {

  Event.update(
    req.body,
    { where: { id: req.body.id }}
  )
    .then(function (num) {
      console.log("num: ",num)
      if (num[0] > 0) {
        res.status(200).send({
          status: "success"
        });
      } else {
        res.status(404).send({
          message: `Cannot update event with id=${req.body.id}!`
        });
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message: "Could not update Event with id=" + req.body.id
      });
    });


  
};

// Delete a Event with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Event.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Event was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Event with id=${id}!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Event with id=" + id
        });
      });
  };

// Delete all Event from the database.
exports.deleteAll = (req, res) => {
    Event.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Events were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Events."
        });
      });
  };
