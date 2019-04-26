const express = require("express");
const mongoose = require("mongoose");

const Station = mongoose.model("Station");

const router = express.Router();

// Get Stations
router.get("/", async (req, res) => {
  res.send(await Station.find({}));
});
// Get Stations by id
router.get("/:id", async (req, res) => {
  const schoolId = req.params.id;
  console.log("id is: ", schoolId);
  res.send(await Station.find({ AtSchoolId: schoolId }));
});
// Add Station
router.post("/", async (req, res) => {
  var SchoolId = await req.body.schoolId;
  var Name = await req.body.name;
  console.log(`schoolId is ${SchoolId}`);
  console.log(`name is....${Name}`);
  var station = new Station({
    AtSchoolId: SchoolId,
    Name: Name,
    CreatedAt: new Date()
  });
  station.save(function(err) {
    if (err) res.status(400).send();
    res.status(201).send();
  });
  //res.send("hello-posted");
});

// Delete Station
router.delete("/:id", async (req, res) => {
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  Station.deleteOne({ _id: req.params.id }, function(err) {
    if (err) res.status(400).send;
    res.status(200).send();
  });
});

module.exports = router;
