const mongoose = require("mongoose");
const { Schema } = mongoose;

const schoolSchema = new Schema({
  Name: String,
  EmailDomain: [String],
  CreatedAt: Date
});

const School = mongoose.model("School", schoolSchema);
module.exports = School;
