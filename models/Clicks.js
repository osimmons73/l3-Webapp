const mongoose = require("mongoose");
const { Schema } = mongoose;

const clicksSchema = new Schema({
  email: { type: String, unique: true },
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  dateClicked: Date,
  clicks: Number
});

mongoose.model("Clicks", clicksSchema);
