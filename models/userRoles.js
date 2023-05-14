const mongoose = require("mongoose");

const userRole = new mongoose.Schema({
  user_id: { type: String},
  tenant_id: {type: String, default: "testTenant"},
  role : { type: String, enum: {
    values: ['user', 'tenant-admin', 'platform-admin'],
    message: '{VALUE} is not supported'
  }},
});

module.exports = mongoose.model("userRole", userRole);