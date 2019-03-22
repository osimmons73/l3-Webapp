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
  var schoolName = await req.body.name;
  var emailDomain = await req.body.emailDomain;
  var school = new School({
    name: schoolName,
    emailDomain: emailDomain,
    createdAt: new Date()
  });
  school.save(function(err) {
    if (err) res.status(400).send();
    res.status(201).send();
  });
  //res.send("hello-posted");
});

// Delete School
router.delete("/:id", async (req, res) => {
  School.deleteOne({ _id: req.params.id }, function(err) {
    if (err) res.status(400).send;
    res.status(200).send();
  });
});

module.exports = router;
