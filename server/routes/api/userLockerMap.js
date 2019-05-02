const express = require("express");
const mongoose = require("mongoose");
const moment = require("moment");
var updateLockerStatus = require("../../services/lockerService");
const UserLockerMap = mongoose.model("UserLockerMap");

const router = express.Router();

// Get All User-Locker Mappings
router.get("/all", async (req, res) => {
  res.send(await UserLockerMap.find({}));
});

// Get User-Locker Mappings by userId and/or update lockerstatus
router.get("/:id/:stationId", async (req, res) => {
  var userId = await req.params.id;
  var stationId = await req.params.stationId;
  var stationLockers = await UserLockerMap.find({
    StationId: stationId
  });
  // var lockers = await UserLockerMap.find({
  //   UserId: userId
  // });
  var toDeactivate = new Set([]);
  var deactivateList = [];
  var now = moment();

  for (var i = 0; i < stationLockers.length; i++) {
    var ended = moment(stationLockers[0]["EndAt"]);
    var duration = moment.duration(ended.diff(now)).asMinutes();
    if (duration < 0) {
      // add to list to deactivate locker at this station
      toDeactivate.add(stationLockers[0]["LockerId"]);
    }
  }
  toDeactivate.forEach(v => deactivateList.push(v));
  updateLockerStatus(deactivateList);
  res.send(
    await UserLockerMap.find({
      UserId: userId
    })
  );
});
// Add User-Locker Mapping
router.post("/", async (req, res) => {
  var userId = await req.body.userId;
  var SchoolId = await req.body.schoolId;
  var StationId = await req.body.stationId;
  var lockerId = await req.body.lockerId;
  var now = await new Date();
  var end = await moment(now)
    .add(5, "minutes")
    .toDate();

  var userLockerMap = new UserLockerMap({
    UserId: userId,
    SchoolId,
    StationId,
    LockerId: lockerId,
    StartedAt: now,
    EndAt: end
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
