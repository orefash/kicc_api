const db = require("../models");
const RType = db.relnTypes;
const Op = db.Sequelize.Op;

// Create and Save a new RType
exports.preload = (type, desc) => {
    // Validate request
    if (!type) {
        return({
        message: "Type cannot be empty!"
        });
        return;
    }

    // Create a RType
    const rType = {
        name: type,
        description: desc
    };

    // Save RType in the database
    RType.create(rType)
        .then(data => {
        return(data);
        })
        .catch(err => {
        console.log(err.message+" : Some error occurred while creating the RType.");
        });
};



// Create and Save a new RType
exports.create = (req, res) => {
  // Validate request
  if (!req.body.type) {
      res.status(400).send({
      message: "Type cannot be empty!"
      });
      return;
  }

  // Create a RType
  const RType = {
      type: req.body.type,
      description: req.body.description
  };

  // Save RType in the database
  RType.create(RType)
      .then(data => {
      res.send(data);
      })
      .catch(err => {
      res.status(500).send({
          message:
          err.message || "Some error occurred while creating the RType."
      });
      });
};



// Retrieve all RTypes from the database.
exports.findAll = (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    RType.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving RTypes."
        });
    });
  };

// Find a single RType with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  RType.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving RType with id=" + id
      });
    });
};
// Update a RType by the id in the request
exports.update = (req, res) => {
  
};

// Delete a RType with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    RType.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "RType was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete RType with id=${id}. Maybe RType was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete RType with id=" + id
        });
      });
  };

// Delete all RTypes from the database.
exports.deleteAll = (req, res) => {
    RType.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} RTypes were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all RType."
        });
      });
  };

// Find all published RTypes
// exports.findAllPublished = (req, res) => {
  
// };
