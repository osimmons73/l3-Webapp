const mongoose = require("mongoose");
const { Schema } = mongoose;

const stationSchema = new Schema({
  AtSchoolId: { type: Schema.Types.ObjectId, ref: "School" },
  Name: String,
  CreatedAt: Date
});

const Station = mongoose.model("Station", stationSchema);
module.exports = Station;
