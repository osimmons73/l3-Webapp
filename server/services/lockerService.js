const express = require("express");
const mongoose = require("mongoose");

const Locker = mongoose.model("Locker");

module.exports = {
  DowngradeLockerStatus: async function(lockerIds) {
    console.log(lockerIds);
    Lockers = await Locker.find({ _id: { $in: lockerIds } });
    const res = await Locker.updateMany(
      { _id: { $in: lockerIds } },
      { IsUsed: false }
    );
    return Lockers;
  },
  UpgradeLockerStatus: async function(lockerId) {
    const res = await Locker.updateOne({ _id: lockerId }, { IsUsed: true });
  }
};
