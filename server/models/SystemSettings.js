const mongoose = require("mongoose");
const { Schema } = mongoose;

const systemSettingsSchema = new Schema({});

mongoose.model("SystemSettings", systemSettingsSchema);
