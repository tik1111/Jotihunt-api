const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, default: null, require: true },
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  tenant_id: {type: String},
  token: { type: String },
  refreshtoken: {type:String}
});

module.exports = mongoose.model("user", userSchema);