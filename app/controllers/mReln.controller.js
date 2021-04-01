const db = require("../models");
const MReln = db.mRelns;
const Op = db.Sequelize.Op;


// Create and Save a new MReln
exports.createReln = (m1, m2, reln, desc, res) => {
  // Validate request
  if (!m1 && !m2) {
    res.send({
        status: 1,
      message: "Member 1 and 2 cannot be empty!"
      });
  }

  // Create a MReln
  const mReln = {
      member1: m1,
      member2: m2,
      relationship: reln,
      description: desc
  };

  // Save MReln in the database
  MReln.create(mReln)
      .then(data => {
        res.send({id: m1, status:0, data: data})
      // res.send(data);
      })
      .catch(err => {
        
        res.send({status:1, message:
          err.message})
      
      });
};

// Create and Save a new MReln
exports.create = (req, res) => {
    // Validate request
    if (!req.body.member1 && !req.body.member2) {
        res.status(400).send({
        message: "Member 1 and 2 cannot be empty!"
        });
        return;
    }

    // Create a MReln
    const MReln = {
        member1: req.body.member1,
        member2: req.body.member2,
        relationship: req.body.relationship,
        description: req.body.description
    };

    // Save MReln in the database
    MReln.create(MReln)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the MReln."
        });
        });
};

// Retrieve all MRelns from the database.
exports.findAll = (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    MReln.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving MRelns."
        });
    });
  };

// Find a single MReln with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  MReln.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving MReln with id=" + id
      });
    });
};
// Update a MReln by the id in the request
exports.update = (req, res) => {
  
};

// Delete a MReln with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    MReln.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "MReln was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete MReln with id=${id}. Maybe MReln was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete MReln with id=" + id
        });
      });
  };

// Delete all MRelns from the database.
exports.deleteAll = (req, res) => {
    MReln.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} MRelns were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all MReln."
        });
      });
  };

// Find all published MRelns
// exports.findAllPublished = (req, res) => {
  
// };
