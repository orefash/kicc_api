const db = require("../models");
const mrelnCtrl = require("../controllers/mReln.controller");
const Member = db.members;
const MReln = db.mRelns;
const Op = db.Sequelize.Op;



// Create and Save a new Member Relationship
exports.createReln = (req, res) => {
  // Validate request
  if (!req.body.fname) {
      res.status(400).send({
      message: "Name cannot be empty!"
      });
      return;
  }

  console.log("In member reln add: ", req.body);
  // Create a Member
  const member = {
      fname: req.body.fname,
      mname: req.body.mname,
      lname: req.body.lname,
      description: req.body.desc,
      branchId: req.body.branchId,
      givingNo: req.body.givingNo,
      title: req.body.title,
      sex: req.body.sex,
      bday: req.body.bday,
      street: req.body.street,
      city: req.body.city,
      country: req.body.country,
      email: req.body.email,
      phone: req.body.phone,
      marital_status: req.body.marital_status,
      m_anniversary: req.body.m_anniversary,
      occupation: req.body.occupation,
      employer: req.body.employer,
      church_bg: req.body.church_bg,
      baptized: req.body.baptized
  };

  // Save Member in the database
  Member.create(member)
      .then(data => {

        var result = mrelnCtrl.createReln(data.id, req.body.mid, req.body.reln, "", res);
        // console.log("in Relationship added: ", result)
        // if(result.status == 0){
        //   console.log("Relationship added: ", result)
        //    (result);
        // }else{
          
        //   console.log("Relationship add error: ", result)
        //   res.send(result);
        // }

        
      })
      .catch(err => {
        console.log( err, "Some error occurred while creating the Member and reln.");
      res.status(500).send({
          message:
          err || "Some error occurred while creating the Member and reln."
      });
      });
};



// Create and Save a new Member
exports.create = (req, res) => {
    // Validate request
    if (!req.body.fname || !req.body.lname || !req.body.phone1 || !req.body.email || !req.body.password) {
        res.status(400).send({
        message: "incomplete details sent!"
        });
        return;
    }

    Member.findOne({where: {email: req.body.email}}).then(function(user) {
      if (user) {
        res.status(400).send({
          message: "Email already exists!"
          });
      } else {
        
        // Save Member in the database
        Member.create(req.body)
        .then(data => {
          res.status(200).send(data);
        })
        .catch(err => {
          console.log( err, "Some error occurred while creating the Member.");
          res.status(500).send({
              message:
              err || "Some error occurred while creating the Member."
          });
        });

      }
    }).catch(err => {
      console.log( err, "Some error occurred while creating the Member.");
      res.status(500).send({
        message:
          err || "Some error occurred while creating the Member."
      });
    });

    // console.log("In member reg: ", req.body);
    
    
};

// Retrieve all Members from the database.
exports.findAll = (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Member.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Members."
        });
    });
  };



  // Find a single Member with an id
exports.findMember = async (id) => {
  // const id = req.params.id;
  console.log("In member find:", id )

  try {
    let member = await Member.findByPk(id);//console.log("Member: ", data)
    return(member);
  } catch (error) {
    return({
      message: "Error retrieving Member with id=" + id
    });
  }
  
   
};

// Find a single Member with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Member.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Member with id=" + id
      });
    });
};


// Find a single Member with an id
exports.loginUser = (req, res) => {
  const mail = req.body.email;
  const pass = req.body.password;

  Member.findOne({
    where: { email: mail }
   }).then(data => {
    
    if(!data){
      res.status(404).send({
        message: "User not found =" + mail
      });
    }else if(!data.correctPassword(pass)) {
      res.status(404).send({
        message: "Incorrect login details"
      });
      
    }else{
      res.status(200).send(data);
    }
    
  })
  .catch(err => {
    console.log(err)
    res.status(500).send({
      message: "Error retrieving Member with id=" + mail
    });
  });

  // Member.findByPk(id)
    
};

// Update a Member by the id in the request
exports.update = (req, res) => {

  Member.update(
    req.body,
    {returning: true, where: { id: req.body.id }}
  )
    .then(function (num) {
      console.log("num: ",num)
      if (num[0] == 1) {
        res.status(200).send({
          status: "success"
        });
      } else {
        res.status(404).send({
          message: `Cannot update user with id=${req.body.email}!`
        });
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message: "Could not update Member with id=" + req.body.email
      });
    });


  
};

// Delete a Member with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Member.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Member was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Member with id=${id}. Maybe Member was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Member with id=" + id
        });
      });
  };

// Delete all Members from the database.
exports.deleteAll = (req, res) => {
    Member.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Members were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Member."
        });
      });
  };

// Find all published Members
// exports.findAllPublished = (req, res) => {
  
// };
