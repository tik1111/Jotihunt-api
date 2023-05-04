const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema({
  refreshToken: { type: String},
  email: { type: String },
  tenant_id: {type: String, default: "testTenant"}
});

module.exports = mongoose.model("refreshToken", refreshTokenSchema);