const express = require("express");
const mongoose = require("mongoose");
const moment = require("moment");
var LockerService = require("../../services/lockerService");
const UserLockerMap = mongoose.model("UserLockerMap");
const Locker = mongoose.model("Locker");

const router = express.Router();

// Get All User-Locker Mappings
router.get("/all", async (req, res) => {
  res.send(await UserLockerMap.find({}));
});
// Get user-locker mapping by station id
router.get("/station/:stationId", async (req, res) => {
  var stationId = await req.params.stationId;
  res.send(await UserLockerMap.find({ StationId: stationId }));
});
// Get my User-Locker Mappings
router.get("/:id", async (req, res) => {
  userId = req.params.id;
  res.send(
    UserLockerMap.aggregate([
      {
        $lookup: {
          from: "School",
          foreignField: "SchoolId",
          as: "map_docs"
        }
      },
      {
        $match: {
          map_docs: { $ne: [] }
        }
      }
    ])
  );
  // res.send(
  //   await UserLockerMap.find({
  //     UserId: userId
  //   })

  //     .populate("SchoolId")
  //     .populate("StationId")
  //     .populate({
  //       "LockerId",
  //       match: {
  //         IsUsed: true
  //       }
  //     })
  //   //.populate("LockerId", "LockerName IsUsed EndAt")
  // );
});
// update lockerstatus at this station
router.get("/updatelocker", async (req, res) => {
  // var userId = await req.params.id;
  // var stationId = await req.params.stationId;
  // get all lockers at current station via user-locker mapping
  var stationLockers = await UserLockerMap.find({});
  // var lockers = await UserLockerMap.find({
  //   UserId: userId
  // });
  var toDeactivate = new Set([]);
  var deactivateList = [];
  var now = moment();
  // console.log("hit!");
  for (var i = 0; i < stationLockers.length; i++) {
    var ended = moment(stationLockers[i]["EndAt"]);
    var duration = moment.duration(ended.diff(now)).asMinutes();
    // console.log(i, "time left: ", duration);
    if (duration < 0) {
      // add to list to deactivate locker at this station if locker expired
      toDeactivate.add(stationLockers[i]["LockerId"]);
      // console.log(`lock ${i}: ${stationLockers[i]["LockerId"]}`);
      // console.log(`stay ${i} ${stationLockers[i]["StationId"]}`);
    }
  }
  toDeactivate.forEach(v => deactivateList.push(v));
  LockerService.DowngradeLockerStatus(deactivateList);
  res.status(200).send();
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
  LockerService.UpgradeLockerStatus(lockerId);
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
