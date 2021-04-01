const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

var corsOptions = {
  origin: "http://127.0.0.1:8080"
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//setup public folder
app.use(express.static('./public'));

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/static', express.static(__dirname + '/regform'));
app.use(express.static("regform"));

const db = require("./app/models");

db.sequelize.sync();

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

const CheckCtrl = require("./app/controllers/check.controller");
const branchCtrl = require("./app/controllers/branch.controller");
const deptCtrl = require("./app/controllers/department.controller");
const memberCtrl = require("./app/controllers/member.controller");
const rtypeCtrl = require("./app/controllers/reln_type.controller");

run().catch(error => console.log(error.stack));

async function initDb(){
  const check = await CheckCtrl.create(1, "init");

  const branch1 = await branchCtrl.preload("KICC Maryland", "Maryland", "Pastor Femi");
  const branch2 = await branchCtrl.preload("KICC Abuja", "Abuja", "Pastor XXXX");
  const branch3 = await branchCtrl.preload("KICC Ikorodu", "Ikorodu", "Pastor XXXX");

  const relType1 = await rtypeCtrl.preload("Spouse", "Spouse");
  const relType2 = await rtypeCtrl.preload("Child", "Child");
  const relType3 = await rtypeCtrl.preload("Sibling", "Sibling");


  const depts = ["KINGS KIDZ", "TNT", "KBI", "SPECIAL STEWARDS", "HOSPITALITY", "PROTOCOL", "TRANSPORT", "PEACE KEEPING", "TRAFFIC", "MEETERS AND GREETERS", "USHERING", "JANITORIAL", "CHOIR", "TNT CHOIR", "KINGS KIDZ CHOIR", "DRAMA", "XPRESSIONS", "EVANGELISM", "FOLLOW-UP", "PRAYER", "HOPELINE", "VISITATION", "INFORMATION MANAGEMENT", "FACILITY MANAGEMENT", "EVENT MANAGEMENT", "INFONET", "AUDIO TECHNICAL", "VIDEO", "SOCIAL MEDIA", "PRODUCTS (SALES AND PRODUCTION)", "IT"];

  depts.forEach(async function(dept) {
    await deptCtrl.preload(dept, "");
  });

}

async function run() {
  const check = await CheckCtrl.findAll();
  // console.log("Check : ", check);
  if(check){
    console.log("Check : found");
    if(check.length === 0){
      console.log("Check : empty");
      await initDb();
    }
    
    // console.log("Check : ", check);
  }else{
    await initDb();
    console.log("Check : empty");
  }

}


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.get("/sregister", async (req, res) => {
  var id = req.query.member;
  console.log("Id: ", id);

  try {
    var member = await memberCtrl.findMember(id);
    console.log("Member: ", member);

    res.render('pages/reg_spouse', {member: member})
  } catch (error) {
    res.send("Error: ", error)
  }

  
});


app.get("/chregister", async (req, res) => {
  var id = req.query.member;
  console.log("Id: ", id);

  try {
    var member = await memberCtrl.findMember(id);
    console.log("Member: ", member);

    res.render('pages/reg_child', {member: member})
  } catch (error) {
    res.send("Error: ", error)
  }
});


app.get("/register", (req, res) => {
  res.render('pages/register')
});

app.get('/confirm', (req, res) => {

  var id = req.query.member;
  console.log("Id: ", id);

  res.render('pages/confirm', {id: id})
});

require("./app/routes/member.routes")(app);
require("./app/routes/department.routes")(app);
require("./app/routes/branch.routes")(app);
require("./app/routes/event.routes")(app);
require("./app/routes/testimony.routes")(app);
require("./app/routes/prayReq.routes")(app);
require("./app/routes/resetToken.routes")(app);




// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
