const db = require("../models");
const Testimony = db.testimony;
const User = db.members;
const Op = db.Sequelize.Op;


// Create and Save a new Member
exports.create = (req, res) => {
    // Validate request
    if (!req.body.user || !req.body.testimony ) {
        res.status(400).send({
        message: "incomplete details sent!"
        });
        return;
    }

    console.log("In testimony create: ", req.body);
    
    // Save Member in the database
    Testimony.create({testimony: req.body.testimony, memberId: req.body.user})
        .then(data => {
        res.status(200).send(data);
        })
        .catch(err => {
          console.log( err, "Some error occurred while creating the Testimony.");
          res.status(500).send({
              message:
              err || "Some error occurred while creating the Testimony."
          });
        });
};


// Retrieve all Events from the database.
exports.findAll = (req, res) => {
  // const title = req.query.title;
  // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Testimony.findAll({
    include: [
      {
        model: User, 
        as: "members",
        attributes: ['id', 'fname', 'mname', 'lname']
      }
    ]
  }).then(data => {
          res.status(200).send(data);
      })
      .catch(err => {
        console.log(err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Testimonies."
        });
  });
};

// Retrieve all Events from the database.
exports.findApproved = (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Testimony.findAll({
      include: [
        {
          model: User, 
          as: "members",
          attributes: ['id', 'fname', 'mname', 'lname']
        }
      ],
      where: {
        approved: true,
      }
    }).then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
          console.log(err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Testimonies."
          });
    });
  };

// Find a single Event with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Testimony.findByPk(id, {
    include: [
      {
        model: User, 
        as: "members",
        attributes: ['id', 'fname', 'mname', 'lname']
      }
    ]
  })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Testimony with id=" + id
      });
    });
};


// Update a Event by the id in the request
exports.update = (req, res) => {

  Testimony.update(
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
          message: `Cannot update testimony with id=${req.body.id}!`
        });
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message: "Could not update Testimony with id=" + req.body.id
      });
    });


  
};


// Approve testimony
exports.approve = (req, res) => {

  Testimony.update(
    {approved: true},
    { where: { id: req.params.id }}
  )
    .then(function (num) {
      console.log("num: ",num)
      if (num[0] > 0) {
        res.status(200).send({
          status: "success"
        });
      } else {
        res.status(404).send({
          message: `Cannot approve testimony with id=${req.params.id}!`
        });
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message: "Could not approve Testimony with id=" + req.params.id
      });
    });


  
};

// Delete a Event with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Testimony.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Testimony was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Testimony with id=${id}!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Testimony with id=" + id
        });
      });
  };

// Delete all Event from the database.
exports.deleteAll = (req, res) => {
  Testimony.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Testimony were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Events."
        });
      });
  };
