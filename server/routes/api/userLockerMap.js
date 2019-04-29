const express = require("express");
const mongoose = require("mongoose");

const UserLockerMap = mongoose.model("UserLockerMap");

const router = express.Router();

// Get All User-Locker Mappings
router.get("/all", async (req, res) => {
  res.send(await UserLockerMap.find({}));
});

// Get User-Locker Mappings
router.get("/:id", async (req, res) => {
  var userId = await req.params.id;
  res.send(
    await UserLockerMap.find({
      UserId: userId
    })
  );
});
// Add User-Locker Mapping
router.post("/", async (req, res) => {
  var userId = await req.body.userId;
  var lockerId = await req.body.lockerId;
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

// Delete User-locker mapping
router.delete("/:id", async (req, res) => {
  UserLockerMap.deleteOne({ _id: req.params.id }, function(err) {
    if (err) res.status(400).send;
    res.status(200).send();
  });
});

module.exports = router;
