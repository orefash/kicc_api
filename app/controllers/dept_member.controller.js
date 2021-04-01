const db = require("../models");
const DeptMember = db.unitMemberships;
const Op = db.Sequelize.Op;

// Create and Save a new DeptMember
exports.create = (req, res) => {
    // Validate request
    if (!req.body.dept && !req.body.member) {
        res.status(400).send({
        message: "Member and Unit cannot be empty!"
        });
        return;
    }

    // Create a DeptMember
    const DeptMember = {
        member: req.body.member,
        unit: req.body.unit,
        description: req.body.description
    };

    // Save DeptMember in the database
    DeptMember.create(DeptMember)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the DeptMember."
        });
        });
};

// Retrieve all DeptMembers from the database.
exports.findAll = (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    DeptMember.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving DeptMembers."
        });
    });
  };

// Find a single DeptMember with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  DeptMember.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving DeptMember with id=" + id
      });
    });
};
// Update a DeptMember by the id in the request
exports.update = (req, res) => {
  
};

// Delete a DeptMember with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    DeptMember.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "DeptMember was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete DeptMember with id=${id}. Maybe DeptMember was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete DeptMember with id=" + id
        });
      });
  };

// Delete all DeptMembers from the database.
exports.deleteAll = (req, res) => {
    DeptMember.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} DeptMembers were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all DeptMember."
        });
      });
  };

// Find all published DeptMembers
// exports.findAllPublished = (req, res) => {
  
// };
