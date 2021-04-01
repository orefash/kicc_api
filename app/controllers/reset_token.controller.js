const db = require("../models");
const ResetToken = db.resetToken;
const User = db.members;
const Op = db.Sequelize.Op;
// const nodemailer = require('nodemailer');
var http = require("https");

var options = {
  "method": "POST",
  "hostname": "api.pepipost.com",
  "port": null,
  "path": "/v5/mail/send",
  "headers": {
    "api_key": "057019e69accbaf11a8628b42d40c91a",
    "content-type": "application/json"
  }
};


// var auth = {
//   type: 'oauth2',
//   user: 'kingfash5@gmail.com',
//   clientId: '1080432188004-ba2vga8suv7gqmb1d4cq4vc4s8223m4k.apps.googleusercontent.com',
//   clientSecret: '5uCrPSQuk4m2HseWXKtoXPvX',
//   refreshToken: '1//04ZpEwcxnEL1FCgYIARAAGAQSNwF-L9Irj-YwMqjTRfmd7sUgwo_gSjRskeWOrjd4BIV-yMBCvKg0IiQRheCOWHikG_hCObohqfw',
// };

// var mailer = nodemailer.createTransport({
//   service: 'gmail',  // More at https://nodemailer.com/smtp/well-known/#supported-services
//   // auth: auth
//   auth: auth
// });


// Create and Save a new Member
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.email  ) {
        res.status(400).send({
          message: "incomplete details sent!"
        });
        return;
    }

    console.log("In ResetToken create: ", req.body);

    let user = await User.findOne({where: {email: req.body.email}});

    if (user) {

      await ResetToken.update({
        used: true
      },
      {
        where: {
          email: req.body.email
        }
      });

      var token = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
      console.log("PIN: ", token);

      //token expires after one hour
      var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 1/24);

      try {
        await ResetToken.create({
          email: req.body.email,
          expiration: expireDate,
          token: token,
          used: false
        });

        var mail_req = http.request(options, function (mail_res) {
          var chunks = [];

          mail_res.on("data", function (chunk) {
            chunks.push(chunk);
          });

          mail_res.on("end", function () {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
          });
        });

        mail_req.write(JSON.stringify({
          from: {email: 'orefash1@pepisandbox.com', name: 'orefash1'},
          subject: "Password reset",
          content: [{type: 'html', value: 'To reset your password, please use the token below.\n\nToken: '+token+'&email='+req.body.email}],
          personalizations: [{to: [{email: 'orefash1@gmail.com', name: 'Ore Fash'}]}]
        }));
        mail_req.end();

        const message = {
          from: "KICC <no-reply@kicc.com>",
          to: "orefash1@gmail.com",
          replyTo: "no-reply@kicc.com",
          subject: "password reset",
          text: 'To reset your password, please use the token below.\n\nToken: '+token+'&email='+req.body.email
        };
      
        //send email
        // mailer.sendMail(message, function (err, info) {
        //   if(err) { console.log(err)}
        //   else { console.log(info); }
        // });

        res.status(200).send({
          email: req.body.email,
          token: token,
          message: "Email sent successfully"
        });
        
      } catch (error) {

        console.log( error, "Some error occurred while creating the ResetToken.");
        res.status(500).send({
          message:
            err || "Some error occurred while creating the ResetToken."
        });
        
      }

        
    } else {
      res.status(400).send({
        status: "OK"
      });
    }
 
    
    
};


// Find a single Event with an id
exports.verifyToken = async (req, res) => {

  //find the token
  var record = await ResetToken.findOne({
    where: {
      email: req.body.email,
      expiration: { [Op.gt]: db.Sequelize.fn('CURDATE')},
      token: req.body.token,
      used: false
    }
  });
 
  if (record == null) {
    res.status(400).send({
      status: "Invalid token. Please try password reset again."
    });
   
  }else{
    res.status(200).send(record);  
  }

};


// Update a Event by the id in the request
exports.resetPass = async (req, res) => {

  if (!req.body.email || !req.body.newPassword ) {
    res.status(400).send({
      message: "incomplete details sent!"
    });
    return;
  }

  try {

    var upd = await ResetToken.update({
      used: 1
    },
    {
      where: {
        email: req.body.email
      }
    });
    
    await User.update({
      password: req.body.newPassword
    },
    {
      where: {
        email: req.body.email
      },
      individualHooks: true
    });

    res.status(200).send({
      status: "success",
      message: "Password reset. Please login with your new password."
    });  
    
  } catch (error) {
    console.log(err)
    res.status(500).send({
      message: "Could not update password"
    });
  }

  
};

