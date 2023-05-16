const mongoose = require("mongoose");

const participantGroup = new mongoose.Schema({
    name: { type: String},
    accomodation: { type: String },
    street: {type: String},
    housenumber: {type: String},
    housenumber_addition: {type: String},
    postcode: {type: String},
    city: {type: String},
    lat: {type: String},
    long: {type: String},
    photo_assignment_points: {type: String},
    area: {type: String},
});

module.exports = mongoose.model("participantGroup", participantGroup);