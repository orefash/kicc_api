const db = require("../models");
const Department = db.stewardUnits;
const Op = db.Sequelize.Op;


// Create and Save a new Department
exports.preload = (name, desc) => {
  // Validate request
  if (!name) {
      console.log("Name cannot be empty!")
      
      return;
  }

  // Create a Department
  const department = {
      name: name,
      description: desc
  };

  // Save Department in the database
  Department.create(department)
      .then(data => {
      return data;
      })
      .catch(err => {
        console.log("Some error occurred while creating the Department.", err);
      });
};



// Create and Save a new Department
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
        message: "Name cannot be empty!"
        });
        return;
    }

    // Create a Department
    const department = {
        name: req.body.name,
        description: req.body.description
    };

    // Save Department in the database
    Department.create(department)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Department."
        });
        });
};

// Retrieve all Departments from the database.
exports.findAll = (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Department.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Departments."
        });
    });
  };

// Find a single Department with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Department.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Department with id=" + id
      });
    });
};
// Update a Department by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Department with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Department.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Department was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Department with id=${id}. Maybe Department was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Department with id=" + id
        });
      });
  };

// Delete all Departments from the database.
exports.deleteAll = (req, res) => {
    Department.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Departments were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Department."
        });
      });
  };

// Find all published Departments
// exports.findAllPublished = (req, res) => {
  
// };
