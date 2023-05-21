const mongoose = require("mongoose");

const areaStatus = new mongoose.Schema({
    name: { type: String},
    status: { type: String },
    updated_at: {type: String},
});

module.exports = mongoose.model("areaStatus", areaStatus);