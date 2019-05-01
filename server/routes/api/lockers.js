const express = require("express");
const mongoose = require("mongoose");

const Locker = mongoose.model("Locker");

const router = express.Router();

// Get Lockers
router.get("/", async (req, res) => {
  res.send(await Locker.find({}));
});
// Get Locker by Id
router.get("/:id", async (req, res) => {
  const stationId = await req.params.id;
  res.send(await Locker.find({ StationId: stationId }));
});
router.put("/activate/:id", async (req, res) => {
  const lockerId = await req.params.id;
  console.log(lockerId);
  Locker.findOneAndUpdate({ _id: lockerId }, { IsUsed: true }, function(err) {
    if (err) res.status(400).send();
    res.status(200).send();
  });
});

router.put("/deactivate/:id", async (req, res) => {
  const lockerId = await req.params.id;
  Locker.findOneAndUpdate({ _id: lockerId }, { IsUsed: false }, function(err) {
    if (err) res.status(400).send();
    res.status(200).send();
  });
});

// Add Locker
router.post("/", async (req, res) => {
  var StationId = await req.body.stationId;
  var LockerName = await req.body.lockerName;
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
