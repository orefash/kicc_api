const db = require("../models");
const PrayReq = db.prayReq;
const User = db.members;
const Op = db.Sequelize.Op;


// Create and Save a new Member
exports.create = (req, res) => {
    // Validate request
    if (!req.body.user || !req.body.request ) {
        res.status(400).send({
        message: "incomplete details sent!"
        });
        return;
    }

    console.log("In Prayer request create: ", req.body);
    
    // Save Member in the database
    PrayReq.create({request: req.body.request, memberId: req.body.user, can_reach: req.body.can_reach})
        .then(data => {
        res.status(200).send(data);
        })
        .catch(err => {
          console.log( err, "Some error occurred while creating the Pray request.");
          res.status(500).send({
              message:
              err || "Some error occurred while creating the pray request."
          });
        });
};


// Retrieve all Events from the database.
exports.findAll = (req, res) => {
  // const title = req.query.title;
  // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  PrayReq.findAll({
    include: [
      {
        model: User, 
        as: "members",
        attributes: ['id', 'fname', 'mname', 'lname', 'phone1', 'email']
      }
    ]
  }).then(data => {
          res.status(200).send(data);
      })
      .catch(err => {
        console.log(err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Pray Req."
        });
  });
};



// Find a single Event with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  PrayReq.findByPk(id, {
    include: [
      {
        model: User, 
        as: "members",
        attributes: ['id', 'fname', 'mname', 'lname', 'phone1', 'email']
      }
    ]
  })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving pray request with id=" + id
      });
    });
};


// Update a Event by the id in the request
exports.update = (req, res) => {

  PrayReq.update(
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
          message: `Cannot update pray req with id=${req.body.id}!`
        });
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message: "Could not update pray req with id=" + req.body.id
      });
    });


  
};


// Delete a Event with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    PrayReq.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "pray request was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete pray request with id=${id}!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete pray req with id=" + id
        });
      });
  };

// Delete all Event from the database.
exports.deleteAll = (req, res) => {
  PrayReq.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} pray req were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all pray req."
        });
      });
  };
