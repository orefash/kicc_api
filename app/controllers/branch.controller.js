const db = require("../models");
const Branch = db.branches;
const Op = db.Sequelize.Op;

// Create and Save a new Branch
exports.preload = (name, location, pastor) => {
  // Validate request
  if (!name) {
      
      return;
  }

  // Create a Branch
  const Brnch = {
      name: name,
      location: location,
      pastor: pastor
  };

  // Save Branch in the database
  Branch.create(Brnch)
      .then(data => {
       return data;
      })
      .catch(err => {
        console.log("Some error occurred while creating the Branch.", err);
      });
};

// Create and Save a new Branch
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
        message: "Name cannot be empty!"
        });
        return;
    }

    // Create a Branch
    // const Branch = {
    //     name: req.body.name,
    //     location: req.body.location,
    //     pastor: req.body.pastor
    // };

    // Save Branch in the database
    Branch.create(req.body)
        .then(data => {
        res.status(200).send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Branch."
        });
        });
};

// Retrieve all Branchs from the database.
exports.findAll = (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Branch.findAll()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Branches."
        });
    });
  };

// Find a single Branch with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Branch.findByPk(id)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Branch with id=" + id
      });
    });
};
// Update a Branch by the id in the request
exports.update = (req, res) => {

  
  Branch.update(
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
          message: `Cannot update branch with id=${req.body.id}!`
        });
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message: "Could not update branch with id=" + req.body.id
      });
    });


  
};

// Delete a Branch with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Branch.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Branch was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Branch with id=${id}. Maybe Branch was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Branch with id=" + id
        });
      });
  };

// Delete all Branchs from the database.
exports.deleteAll = (req, res) => {
    Branch.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Branchs were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Branch."
        });
      });
  };

// Find all published Branchs
// exports.findAllPublished = (req, res) => {
  
// };
