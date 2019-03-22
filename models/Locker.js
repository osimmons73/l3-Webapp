const mongoose = require("mongoose");
const { Schema } = mongoose;

const lockerSchema = new Schema({
  StationId: { type: Schema.Types.ObjectId, ref: "Station" },
  IsUsed: boolean,
  createdAt: Date
});

const Locker = mongoose.model("Locker", lockerSchema);
module.exports = Locker;
