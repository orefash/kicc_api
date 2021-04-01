const db = require("../models");
const Check = db.check;
const Op = db.Sequelize.Op;

// Create and Save a new Check
exports.create = (flag, status) => {
    // Validate request
    if (!flag) {
      console.log("Flag cannot be empty!");
        
        return;
    }

    // Create a Check
    const Ceck = {
        flag: flag,
        status: status
    };

    // Save Check in the database
    Check.create(Ceck)
        .then(data => {
        return data;
        })
        .catch(err => {
         console.log("Some error occurred while creating the Check.", err);
        });
};

// Retrieve all Checks from the database.
exports.findAll = async () => {
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    console.log("In check find all");

    try {
      var data = Check.findAll();
      return data;
    } catch (error) {
      console.log("Some error occurred while retrieving Checks.", err);
    }
  
    
    //     .then(data => {
    //       console.log("In check find all data: ", data);
    //         return data;
    //     })
    //     .catch(err => {
    //       console.log("Some error occurred while retrieving Checks.", err);
       
    // });
  };

// Find a single Check with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Check.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Check with id=" + id
      });
    });
};
// Update a Check by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Check with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Check.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Check was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Check with id=${id}. Maybe Check was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Check with id=" + id
        });
      });
  };

// Delete all Checks from the database.
exports.deleteAll = (req, res) => {
    Check.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Checks were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Check."
        });
      });
  };

// Find all published Checks
// exports.findAllPublished = (req, res) => {
  
// };
