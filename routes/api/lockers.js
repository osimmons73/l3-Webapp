const express = require("express");
const mongoose = require("mongoose");

const Locker = mongoose.model("Locker");
const School = mongoose.model("School");
const router = express.Router();

// Get Lockers at school, x
router.get("/", async (req, res) => {
  res.send(await Locker.find({}));
});
// Add Locker at school,x
router.post("/", async (req, res) => {
  School.findById({});
  var locker = new Locker({
    schoolName,
    _atSchool,
    createdAt: new Date()
  });
  Locker.save(function(err) {
    if (err) res.status(400).send();
    res.status(201).send();
  });
  //res.send("hello-posted");
});

// Delete Locker at school, x
router.delete("/:id", async (req, res) => {
  Locker.deleteOne({ _id: req.params.id }, function(err) {
    if (err) res.status(400).send;
    res.status(200).send();
  });
});

module.exports = router;
