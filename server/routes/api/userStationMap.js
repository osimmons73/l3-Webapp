const express = require("express");
const mongoose = require("mongoose");

const UserStationMap = mongoose.model("UserStationMap");

const router = express.Router();

// Get User-Station Mappings
router.get("/all", async (req, res) => {
  res.send(await UserStationMap.find({}));
});

// Get User-Station Mappings
router.get("/:id", async (req, res) => {
  var userId = await req.params.id;

  console.log("user:", userId);

  res.send(
    await UserStationMap.find({
      UserId: userId
    })
  );
});
// Add User-Station Mapping
router.post("/", async (req, res) => {
  var userId = await req.body.userId;
  var stationId = await req.body.stationId;
  console.log(`Creating station/user mapping- UserId is ${userId}`);
  console.log(`stationId is ${stationId}`);
  var userStationMap = new UserStationMap({
    UserId: userId,
    StationId: stationId,
    StartedAt: new Date()
  });
  userStationMap.save(function(err) {
    if (err) res.status(400).send();
    res.status(201).send();
  });
});

// Delete User-Station Mapping
router.delete("/:id", async (req, res) => {
  UserStationMap.deleteOne({ _id: req.params.id }, function(err) {
    if (err) res.status(400).send;
    res.status(200).send();
  });
});

module.exports = router;
