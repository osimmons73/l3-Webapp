const express = require("express");
const mongoose = require("mongoose");

const Locker = mongoose.model("Locker");

const router = express.Router();

// Get Lockers
router.get("/", async (req, res) => {
  res.send(await Locker.find({}));
});
// Add Locker
router.post("/", async (req, res) => {
  var StationId = await req.body.stationId;
  var LockerName = await req.body.lockerName;
  console.log(`stationId is ${StationId}`);
  console.log(`locker name is ${LockerName}`);
  var locker = new Locker({
    StationId: StationId,
    LockerName: LockerName,
    IsUsed: false,
    CreatedAt: new Date()
  });
  locker.save(function(err) {
    if (err) res.status(400).send();
    res.status(201).send();
  });
  //res.send("hello-posted");
});

// Delete Locker
router.delete("/:id", async (req, res) => {
  Locker.deleteOne({ _id: req.params.id }, function(err) {
    if (err) res.status(400).send;
    res.status(200).send();
  });
});

module.exports = router;
