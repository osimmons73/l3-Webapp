const mongoose = require("mongoose");
const { Schema } = mongoose;

const userStationMapSchema = new Schema({
  UserId: { type: Schema.Types.ObjectId, ref: "User" },
  StationId: { type: Schema.Types.ObjectId, ref: "Station" },
  StartedAt: Date,
  EndAt: Date
});

const UserStationMap = mongoose.model("UserStationMap", userStationMapSchema);
module.exports = UserStationMap;
