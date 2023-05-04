const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  tenant_id: {type: String},
  token: { type: String },
  refreshtoken: {type:String}
});

module.exports = mongoose.model("user", userSchema);