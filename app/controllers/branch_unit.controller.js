const db = require("../models");
const BranchDept = db.branch_units;
const Op = db.Sequelize.Op;

// Create and Save a new BranchDept
exports.create = (req, res) => {
    // Validate request
    if (!req.body.branch && !req.body.unit) {
        res.status(400).send({
        message: "Branch and Unit cannot be empty!"
        });
        return;
    }

    // Create a BranchDept
    const BranchDept = {
        branchId: req.body.branch,
        unitId: req.body.unit,
        leader: req.body.leader,
        description: req.body.description
    };

    // Save BranchDept in the database
    BranchDept.create(BranchDept)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the BranchDept."
        });
        });
};

// Retrieve all BranchDepts from the database.
exports.findAll = (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    BranchDept.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving BranchDepts."
        });
    });
  };

// Find a single BranchDept with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  BranchDept.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving BranchDept with id=" + id
      });
    });
};
// Update a BranchDept by the id in the request
exports.update = (req, res) => {
  
};

// Delete a BranchDept with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    BranchDept.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "BranchDept was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete BranchDept with id=${id}. Maybe BranchDept was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete BranchDept with id=" + id
        });
      });
  };

// Delete all BranchDepts from the database.
exports.deleteAll = (req, res) => {
    BranchDept.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} BranchDepts were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all BranchDept."
        });
      });
  };

// Find all published BranchDepts
// exports.findAllPublished = (req, res) => {
  
// };
