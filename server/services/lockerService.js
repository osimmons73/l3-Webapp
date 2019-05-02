const express = require("express");
const mongoose = require("mongoose");

const Locker = mongoose.model("Locker");

module.exports = async function(lockerIds) {
  Lockers = await Locker.find({ _id: { $in: lockerIds } });
  const res = await Locker.updateMany(
    { _id: { $in: lockerIds } },
    { IsUsed: false }
  );
  return Lockers;
};
