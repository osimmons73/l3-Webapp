const mongoose = require("mongoose");
const { Schema } = mongoose;

const userLockerMapSchema = new Schema({
  UserId: { type: Schema.Types.ObjectId, ref: "User" },
  LockerId: { type: Schema.Types.ObjectId, ref: "Locker" },
  StartedAt: Date,
  EndAt: Date
});

const UserLockerMap = mongoose.model("UserLockerMap", userLockerMapSchema);
module.exports = UserLockerMap;
