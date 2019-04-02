const express = require("express");
const mongoose = require("mongoose");

const UserLockerMap = mongoose.model("UserLockerMap");

const router = express.Router();

// Get User-Locker Mappings
router.get("/", async (req, res) => {
  res.send(await UserLockerMap.find({}));
});
// Add User-Locker Mapping
router.post("/", async (req, res) => {
  var userId = await req.body.userId;
  var lockerId = await req.body.lockerId;
  console.log(`UserId is ${userId}`);
  console.log(`lockerId is ${lockerId}`);
  var userLockerMap = new UserLockerMap({
    UserId: userId,
    LockerId: lockerId,
    StartedAt: new Date()
  });
  userLockerMap.save(function(err) {
    if (err) res.status(400).send();
    res.status(201).send();
  });
  //res.send("hello-posted");
});

// Delete School
router.delete("/:id", async (req, res) => {
  UserLockerMap.deleteOne({ _id: req.params.id }, function(err) {
    if (err) res.status(400).send;
    res.status(200).send();
  });
});

module.exports = router;
