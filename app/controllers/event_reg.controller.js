const db = require("../models");
const EventReg = db.eventReg;
const Member = db.members;
const Op = db.Sequelize.Op;


// Create and Save a new Member
exports.create = (req, res) => {
    // Validate request
    if (!req.body.user || !req.body.event ) {
        res.status(400).send({
        message: "incomplete details sent!"
        });
        return;
    }

    console.log("In EventReg create: ", req.body);
    
    // Save EventReg in the database
    EventReg.create(req.body)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
          console.log( err, "Some error occurred while creating the EventReg.");
        res.status(500).send({
            message:
            err || "Some error occurred while creating the EventReg."
        });
        });
};

// Retrieve all Event Registrations from the database.
exports.findAll = (req, res) => {
    // const event = req.query.title;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    EventReg.findAll({
      where: {
        event: req.params.event
      },
      include: [{
        model: Member
       }]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving EventReg."
        });
    });
  };

// Find a single EventReg with an id
// exports.findOne = (req, res) => {
//   const id = req.params.id;

//   EventReg.findByPk(id)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error retrieving EventReg with id=" + id
//       });
//     });
// };


// Update a EventReg by the id in the request
// exports.update = (req, res) => {

//   EventReg.update(
//     req.body,
//     { where: { id: req.body.id }}
//   )
//     .then(function (num) {
//       console.log("num: ",num)
//       if (num[0] > 0) {
//         res.status(200).send({
//           status: "success"
//         });
//       } else {
//         res.status(404).send({
//           message: `Cannot update EventReg with id=${req.body.id}!`
//         });
//       }
//     })
//     .catch(err => {
//       console.log(err)
//       res.status(500).send({
//         message: "Could not update EventReg with id=" + req.body.id
//       });
//     });


  
// };

// Delete a EventReg with the specified id in the request
// exports.delete = (req, res) => {
//     const id = req.params.id;
  
//     EventReg.destroy({
//       where: { id: id }
//     })
//       .then(num => {
//         if (num == 1) {
//           res.send({
//             message: "EventReg was deleted successfully!"
//           });
//         } else {
//           res.send({
//             message: `Cannot delete EventReg with id=${id}!`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Could not delete EventReg with id=" + id
//         });
//       });
//   };

// // Delete all EventReg from the database.
// exports.deleteAll = (req, res) => {
//     EventReg.destroy({
//       where: {},
//       truncate: false
//     })
//       .then(nums => {
//         res.send({ message: `${nums} EventRegs were deleted successfully!` });
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while removing all EventRegs."
//         });
//       });
//   };
