const express = require("express");
const mongoose = require("mongoose");

const School = mongoose.model("School");

const router = express.Router();

// Get Schools
router.get("/", async (req, res) => {
  res.send(await School.find({}));
});
// Add School
router.post("/", async (req, res) => {
  var SchoolName = await req.body.name;
  var EmailDomain = await req.body.emailDomain;
  console.log(`schoolname is ${SchoolName}`);
  console.log(`emailDomain is ${EmailDomain}`);
  var school = new School({
    Name: SchoolName,
    EmailDomain: EmailDomain,
    CreatedAt: new Date()
  });
  school.save(function(err) {
    if (err) res.status(400).send();
    res.status(201).send();
  });
  //res.send("hello-posted");
});

// Delete School
router.delete("/:id", async (req, res) => {
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  School.deleteOne({ _id: req.params.id }, function(err) {
    if (err) res.status(400).send;
    res.status(200).send();
  });
});

module.exports = router;
