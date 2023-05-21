const mongoose = require("mongoose");

const userLocation = new mongoose.Schema({
  userLocation: { type: String},
  user_id: { type: String },
  tenant_id: {type: String, default: "testTenant"},
});

module.exports = mongoose.model("userLocation", userLocation);